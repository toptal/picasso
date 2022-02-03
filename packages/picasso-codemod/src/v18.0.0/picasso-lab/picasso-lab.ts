/**
 * This codemod replaces references to `picasso-lab` with `picasso`.
 *
 * After replacing, we might have multiple import instances of
 * `@toptal/picasso`, and we should combine them into one.
 *
 * import [@specifier] from [@moduleSpecifier]
 *
 * @specifier:
 *   * as Component - ImportNamespaceSpecifier
 *   { Component } - ImportSpecifier
 *   Component - ImportDefaultSpecifier
 * @moduleSpecifier: string
 *
 *
 * Steps:
 *  1. replace `picasso-lab` with `picasso`
 *  2. get all `@toptal/picasso` modules (child modules as well) and remove them
 *  3. combine `@toptal/picasso` (child modules as well) modules respectively
 *  4. insert at the beginning of the file
 *
 *  child modules - `@toptal/picasso/A`, `@toptal/picasso/A/B`, ...
 */
import {
  Core,
  ImportDefaultSpecifier,
  ImportNamespaceSpecifier,
  ImportSpecifier,
  JSCodeshift,
  Transform,
  ImportDeclaration
} from 'jscodeshift'

type ImportTypes =
  | ImportSpecifier
  | ImportDefaultSpecifier
  | ImportNamespaceSpecifier

interface Specifier {
  name: string
  type:
    | 'ImportSpecifier'
    | 'ImportDefaultSpecifier'
    | 'ImportNamespaceSpecifier'
}

const isPicassoImport = (node: ImportDeclaration) =>
  node.source.value === '@toptal/picasso' ||
  new RegExp(node.source.value as string).test('^(@toptal/picasso/.*)$')

const createImport = (
  j: JSCodeshift,
  specifiers: Specifier[],
  moduleSpecifier: string,
  root: ReturnType<Core>
) => {
  const imports: ImportTypes[] = []

  specifiers.forEach(specifier => {
    if (specifier.type === 'ImportDefaultSpecifier') {
      imports.push(j.importDefaultSpecifier(j.identifier(specifier.name)))
    } else if (specifier.type === 'ImportSpecifier') {
      imports.push(j.importSpecifier(j.identifier(specifier.name)))
    } else {
      root
        .find(j.Declaration)
        .at(0)
        .get()
        .insertBefore(
          j.importDeclaration(
            [j.importNamespaceSpecifier(j.identifier(specifier.name))],
            j.stringLiteral(moduleSpecifier)
          )
        )
    }
  })

  return j.importDeclaration(imports, j.stringLiteral(moduleSpecifier))
}

const insertImports = (
  root: ReturnType<Core>,
  j: JSCodeshift,
  importsMap: Map<string, Specifier[]>
) => {
  for (const [moduleSpecifier, specifiers] of importsMap) {
    root
      .find(j.Declaration)
      .at(0)
      .get()
      .insertBefore(createImport(j, specifiers, moduleSpecifier, root))
  }
}

const getSpecifierName = (specifier: any) => {
  const name = specifier.local!.name

  if (specifier.type === 'ImportSpecifier') {
    const identifierName = specifier.imported.loc!.identifierName

    return identifierName && identifierName === name
      ? name
      : `${identifierName} as ${name}`
  }

  return name
}

const transform: Transform = (file, api) => {
  const j = api.jscodeshift
  const root: ReturnType<Core> = j(file.source)
  const importsMap: Map<string, Specifier[]> = new Map()

  root
    .find(j.StringLiteral, ({ value }) => value.includes('picasso-lab'))
    .map(path => {
      path.value.value = path.value.value.replace('picasso-lab', 'picasso')

      return path
    })

  root
    .find(j.ImportDeclaration, isPicassoImport)
    .forEach(path => {
      const moduleSpecifier = path.value.source.value as string
      const specifiers: Specifier[] =
        path.value.specifiers?.map(specifier => ({
          name: getSpecifierName(specifier),
          type: specifier.type
        })) || []

      if (importsMap.has(moduleSpecifier)) {
        const prevSpecifiers = importsMap.get(moduleSpecifier) as Specifier[]

        importsMap.set(moduleSpecifier, [...prevSpecifiers, ...specifiers])
      } else {
        importsMap.set(moduleSpecifier, specifiers)
      }

      return path
    })
    .remove()

  insertImports(root, j, importsMap)

  return root.toSource({ quote: 'single' })
}

export default transform
