import { ImportDeclaration } from 'jscodeshift'

/**
 * Checks if specifier is from a specific package.
 * It's useful when used in composition with filter or find
 */
export const isSpecifierFor = (
  exportedName: string,
  specifier: NonNullable<ImportDeclaration['specifiers']>[0]
): boolean =>
  specifier.type === 'ImportSpecifier' &&
  specifier.imported.name === exportedName
