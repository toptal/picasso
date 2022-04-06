import { ImportDeclaration } from 'jscodeshift'

export const isSpecifierFor = (
  exportedName: string,
  specifier: NonNullable<ImportDeclaration['specifiers']>[0]
): boolean =>
  specifier.type === 'ImportSpecifier' &&
  specifier.imported.name === exportedName
