import type { API, Collection } from 'jscodeshift'

export const insertSpacingImport = (
  api: API,
  ast: Collection<any>,
  spacingsToImport: string[]
) => {
  const j = api.jscodeshift

  const newImport = j.importDeclaration(
    Array.from(new Set(spacingsToImport)).map(spacing =>
      j.importSpecifier(j.identifier(spacing))
    ),
    j.stringLiteral('@toptal/picasso/utils')
  )

  const anchorDeclaration = ast
    .find(j.ImportDeclaration)
    .filter(
      path =>
        path.node.source.value === '@toptal/picasso' ||
        path.node.source.value === '../Container' ||
        path.node.source.value === '../Dropdown'
    )
    .at(0)

  if (anchorDeclaration.length === 0) {
    throw new Error(
      `Unable to find @toptal/picasso or Container declaration to insert new spacing import`
    )
  }

  anchorDeclaration.get().insertAfter(newImport)
}
