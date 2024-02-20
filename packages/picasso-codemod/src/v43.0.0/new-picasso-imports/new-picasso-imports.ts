import type {
  Transform,
  ASTPath,
  ImportDeclaration,
  JSCodeshift,
  ImportSpecifier,
  Collection,
} from 'jscodeshift'

const IGNORED_PACKAGES = new Set([
  '@toptal/picasso/utils',
  '@toptal/picasso-forms/utils',
  '@toptal/picasso/test-utils',
])

const PACKAGES_TO_PROCESS = ['picasso', 'picasso-forms']

const INDEX_PATTERN = /index(\.[jt]sx?)?/

const getImportedName = (name: string, component: string, pkg: string) => {
  // A few common exceptions

  if (pkg === 'picasso-forms') {
    if (name === 'FieldProps') {
      return name
    }

    return `Form${component}${name}`
  }

  if (component === 'Icon') {
    return name
  }

  if (component === 'SelectBase') {
    if (name === 'Option') {
      return 'SelectOption'
    }
    if (name === 'OptionGroups') {
      return 'SelectOptionGroups'
    }
    if (name === 'ValueType') {
      return 'SelectValueType'
    }
    if (name === 'SelectProps') {
      return 'SelectBaseProps'
    }
  }

  if (component === 'Calendar') {
    if (name === 'DayProps') {
      return 'DayProps'
    }
    if (name === 'WeekStart') {
      return 'WeekStart'
    }
  }

  // This is only an educated guess on a convention
  // We usually prepend the component name to the exported name when re-exporting from the main picasso
  // Maybe we can add hard coded exceptions for well known imported? Like TagSelector Item's?
  return name.startsWith(component) ? name : `${component}${name}`
}

const getMainPicassoSpecifiers = (
  importDecl: ASTPath<ImportDeclaration>,
  j: JSCodeshift,
  pkg: string
) => {
  const importPath = importDecl.value.source.value as string
  // @ts-expect-error we know the parts exist
  const [, component, file] = importPath.match(
    new RegExp(`@toptal/${pkg}/([^/]+)(?:/([^/]+))?`)
  )

  // This means @toptal/picasso/index, it happened
  if (INDEX_PATTERN.test(component)) {
    return importDecl.value.specifiers
  }

  const isFromIndexModule = !file || INDEX_PATTERN.test(file)
  const isFromTypes = /types(\.[jt]sx?)?/.test(file)
  const isFromMain = file === component

  const specs: ImportSpecifier[] = []

  j(importDecl)
    .find(j.ImportDefaultSpecifier)
    .forEach(defaultImpNode => {
      // This means someone is importing Icons directly
      if (component === 'Icon' && file != null) {
        specs.push(
          j.importSpecifier(j.identifier(file), defaultImpNode.value.local)
        )

        return
      }

      // If default import from component name, or index, then probably importing the component itself
      if (isFromIndexModule || isFromMain) {
        specs.push(
          j.importSpecifier(j.identifier(component), defaultImpNode.value.local)
        )
      } else {
        // This is probably from a unsupported file, we just import it as it is from @toptal/picasso and hope for the best
        // This will probably need to be fixed manually on the project side
        // We can handle common cases before this condition hit, as it is the case for direct SVG icons
        specs.push(
          j.importSpecifier(
            // @ts-expect-error we know the path is defined
            defaultImpNode.value.local,
            defaultImpNode.value.local
          )
        )
      }
    })

  j(importDecl)
    .find(j.ImportSpecifier)
    .forEach(impNode => {
      if (isFromIndexModule || isFromTypes || isFromMain) {
        specs.push(
          j.importSpecifier(
            j.identifier(
              getImportedName(impNode.value.imported.name, component, pkg)
            ),
            impNode.value.local
          )
        )
      }
    })

  return specs
}

const processImportPath = (path: string, j: JSCodeshift, app: Collection) => {
  const picassoSpecifiers = new Map()

  app
    .find(j.ImportDeclaration, imp =>
      // @ts-expect-error we know the path exists and is string
      imp.source.value.startsWith(`@toptal/${path}/`)
    )
    .forEach(imp => {
      if (!IGNORED_PACKAGES.has(imp.value.source.value as string)) {
        // @ts-expect-error always defined
        getMainPicassoSpecifiers(imp, j, path).forEach(sp =>
          picassoSpecifiers.set(sp.local?.name, sp)
        )

        j(imp).remove()
      }
    })

  const existingPicassoImport = app.find(
    j.ImportDeclaration,
    imp => imp.source.value === `@toptal/${path}`
  )

  const picassoImport =
    existingPicassoImport.length > 0
      ? existingPicassoImport.get().value
      : j.importDeclaration([], j.stringLiteral(`@toptal/${path}`))

  picassoImport.specifiers.push(...picassoSpecifiers.values())

  if (existingPicassoImport.length === 0 && picassoSpecifiers.size > 0) {
    app.get().node.program.body.unshift(picassoImport)
  }
}

const transform: Transform = (file, api) => {
  const j = api.jscodeshift

  const app = j(file.source)

  PACKAGES_TO_PROCESS.forEach(pkg => processImportPath(pkg, j, app))

  return app.toSource({ quote: 'single' })
}

export default transform
