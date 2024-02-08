import type {
  Transform,
  ASTPath,
  ImportDeclaration,
  JSCodeshift,
} from 'jscodeshift'

const PICASSO_PACKAGE = '@toptal/picasso'

// We make exceptions to allow import from picasso sub-directory for those paths:
const SUB_IMPORT_EXCEPTIONS = ['utils', 'test-utils']

const replaceImports = (
  path: ASTPath<ImportDeclaration>,
  j: JSCodeshift,
  filePath: string
) => {
  // Import path
  const value = path.node.source.value as string

  if (value === PICASSO_PACKAGE) {
    return
  }

  const isDefaultImport = path.node.specifiers?.some(
    specifier => specifier.type === 'ImportDefaultSpecifier'
  )

  // Get ['Container', 'Thing'] from '@toptal/picasso/Container/Thing'
  const pathChunks = value.split('/').slice(2)

  const isFromUtils = SUB_IMPORT_EXCEPTIONS.some(item =>
    pathChunks.includes(item)
  )

  // Replace all default import to named imports based on last path chunk
  if (isDefaultImport) {
    const specifierName = pathChunks.at(-1)
    const specifierNameLocal = path.node.specifiers?.at(0)?.local?.name

    // Very unlikely, but for cases when
    // default import is used from utils (it's not allowed at all and may be internal)
    if (isFromUtils) {
      console.warn(
        `WARN: default import from "@toptal/picasso/utils" or "@toptal/picasso/test-utils" is detected in ${filePath}, make sure this import works after the codemod is executed`
      )
    }

    // If we detect that local name does not match the respective default export
    // (for example, `import Butt from "@toptal/picasso/Button"`)
    // we want to do an aliased import instead so the code doesn't break
    const resolvedSpecifiers =
      specifierName === specifierNameLocal
        ? [j.importSpecifier(j.identifier(specifierName as string))]
        : [
            j.importSpecifier(
              j.identifier(specifierName as string),
              j.identifier(specifierNameLocal as string)
            ),
          ]

    path.replace(
      j.importDeclaration(
        resolvedSpecifiers,
        j.literal(
          isFromUtils ? `${PICASSO_PACKAGE}/${pathChunks[0]}` : PICASSO_PACKAGE
        )
      )
    )

    return
  }

  // Directly trim path to "@toptal/picasso" for the rest of the imports
  path.replace(
    j.importDeclaration(
      path.node.specifiers,
      j.literal(
        isFromUtils ? `${PICASSO_PACKAGE}/${pathChunks[0]}` : PICASSO_PACKAGE
      ),
      path.node.importKind
    )
  )
}

const transform: Transform = (file, api) => {
  const j = api.jscodeshift
  const root = j(file.source)

  root
    .find(j.ImportDeclaration)
    .filter(path => {
      return (
        path.node.source &&
        path.node.source.type === 'StringLiteral' &&
        path.node.source.value.includes(PICASSO_PACKAGE)
      )
    })
    .forEach(path => replaceImports(path, j, file.path))

  return root.toSource({ quote: 'single' })
}

export default transform
