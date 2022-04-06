import { ImportDeclaration } from 'jscodeshift'

import { PackageMember } from './types'

/**
 * Finds imports for specific member of a package.
 *
 * Usage:
 *
 * ```
 *   j(file.source)
 *     .find(j.ImportDeclaration, decl => isImportFor('module', 'exportName', decl))
 * ```
 */
export const isImportFor = (
  { packageName, exportedName }: PackageMember,
  { source, specifiers }: ImportDeclaration
): boolean => {
  const isSamePackage = source.value === packageName

  if (isSamePackage) {
    const hasMemberExportedName = (specifiers ?? []).some(
      specifier =>
        specifier.type === 'ImportSpecifier' &&
        specifier.imported.name === exportedName
    )

    return hasMemberExportedName
  }

  return false
}
