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

  ast
    .find(j.ImportDeclaration)
    .filter(path => path.node.source.value === '@toptal/picasso')
    .at(0)
    .get()
    .insertAfter(newImport)
}
