import type { Transform } from 'jscodeshift'
import path from 'path'
import fs from 'fs'

const specificModules = [
  'RichText',
  'htmlToHast',
  'RichTextEditor',
  'RichTextEditorProps',
  'ASTType',
  'CustomEmojiGroup',
  'CustomEmoji',
]
const picassoVersion = '36.0.0'
const picassoFormsVersion = '58.0.0'
const picassoRichTextEditorVersion = '1.0.2'

// Get current execution directory
const execDir = process.cwd()

const findPackageJson = (dirPath: string) => {
  // Start with the directory provided
  let currentPath = dirPath

  while (currentPath !== '/' && currentPath !== execDir) {
    // Attempt to read package.json at current path
    try {
      const packageJsonPath = path.join(currentPath, 'package.json')

      if (fs.existsSync(packageJsonPath)) {
        return packageJsonPath
      }
    } catch (err) {
      console.error(err)
    }

    // If package.json doesn't exist, move up one directory
    currentPath = path.dirname(currentPath)
  }

  throw new Error('Could not find package.json')
}

const updatePackageJsonVersions = (
  path: string,
  { addRichTextEditorDependency }: { addRichTextEditorDependency: boolean }
) => {
  try {
    const packageJsonPath = findPackageJson(path)

    // If it exists, read and parse it
    try {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'))

      if (!packageJson.dependencies) {
        return
      }

      let inDevDependencies = false

      // Update Picasso and Picasso forms dependencies
      if (packageJson.dependencies['@toptal/picasso']) {
        packageJson.dependencies['@toptal/picasso'] = picassoVersion
      } else if (
        packageJson.devDependencies &&
        packageJson.devDependencies['@toptal/picasso']
      ) {
        packageJson.devDependencies['@toptal/picasso'] = picassoVersion
        inDevDependencies = true
      }

      if (packageJson.dependencies['@toptal/picasso-forms']) {
        packageJson.dependencies['@toptal/picasso-forms'] = picassoFormsVersion
        // if picasso form is defined, it depends on RichTextEditor, we should also add a dependency
        packageJson.dependencies['@toptal/picasso-rich-text-editor'] =
          picassoRichTextEditorVersion
      } else if (
        packageJson.devDependencies &&
        packageJson.devDependencies['@toptal/picasso-forms']
      ) {
        packageJson.devDependencies['@toptal/picasso-forms'] =
          picassoFormsVersion
        // if picasso form is defined, it depends on RichTextEditor, we should also add a dependency
        packageJson.devDependencies['@toptal/picasso-rich-text-editor'] =
          picassoRichTextEditorVersion
        inDevDependencies = true
      }

      // if RTE is used inside package, we should add a dependency
      if (addRichTextEditorDependency) {
        if (inDevDependencies) {
          packageJson.devDependencies['@toptal/picasso-rich-text-editor'] =
            picassoRichTextEditorVersion
        } else {
          packageJson.dependencies['@toptal/picasso-rich-text-editor'] =
            picassoRichTextEditorVersion
        }
      }

      fs.writeFileSync(
        packageJsonPath,
        JSON.stringify(packageJson, null, 2) + '\n'
      )
    } catch (err) {
      console.log(`Could not parse package.json at ${packageJsonPath}: ${err}`)
    }
  } catch (err) {
    console.log('err: ', err)
    console.error(`Package json not found for ${path}: ${err}`)
  }
}

const transform: Transform = (file, { jscodeshift: j }) => {
  const source = j(file.source)
  let fileContainsRichTextEditorImport = false
  let hasPicassoForms = false

  const picassoImports = source.find(j.ImportDeclaration).filter(path => {
    const pattern = /@toptal\/picasso($|\/[a-z\d]*)/gi

    hasPicassoForms =
      hasPicassoForms || path.node.source.value === '@toptal/picasso-forms'

    return (
      pattern.test(path.node.source.value as string) &&
      path.node.source.value !== '@toptal/picasso-forms'
    )
  })

  // Iterate over react imports
  picassoImports.forEach(picassoImport => {
    const richTextSpecifiers = j(picassoImport)
      .find(j.ImportSpecifier)
      .filter(path => {
        return specificModules.includes(path.node.imported.name)
      })

    // there is only single specifier, replace the whole import
    if (picassoImport.node.specifiers?.length === richTextSpecifiers.length) {
      j(picassoImport).replaceWith(
        // Build a new import declaration node based on the existing one
        j.importDeclaration(
          picassoImport.node.specifiers, // copy over the existing import specificers
          j.stringLiteral(
            (picassoImport.node.source.value as string).replace(
              '@toptal/picasso',
              '@toptal/picasso-rich-text-editor'
            )
          ),
          picassoImport.node.importKind
        )
      )

      fileContainsRichTextEditorImport = true
    } else if (richTextSpecifiers.length > 0) {
      // insert specifiers for rich text editor
      // const importSpecifier = j.importSpecifier(richTextSpecifiers);
      // Generate new specifiers for the new import
      const newSpecifiers = richTextSpecifiers.nodes().map(node => {
        return j.importSpecifier(
          j.identifier(node.imported.name),
          node.local ? j.identifier(node.local.name) : undefined
        )
      })
      // Create a new import declaration
      const newImport = j.importDeclaration(
        newSpecifiers,
        j.literal('@toptal/picasso-rich-text-editor'),
        picassoImport.node.importKind
      )

      j(picassoImport).insertAfter(newImport)

      // there are some specifiers left, remove the ones that are replaced
      j(picassoImport)
        .find(j.ImportSpecifier)
        .filter(path => specificModules.includes(path.node.imported.name))
        .remove()

      fileContainsRichTextEditorImport = true
    }
  })

  // we must update package.json as well. We have to upgrade @toptal/picasso, @toptal/picasso-forms and add new dependency @toptal/picasso-rich-text-editor
  // first of all, we need to search for a package json, it must be in the root of the package
  updatePackageJsonVersions(file.path, {
    addRichTextEditorDependency:
      fileContainsRichTextEditorImport || hasPicassoForms,
  })

  return source.toSource({ trailingComma: false, quote: 'single' })
}

export default transform
