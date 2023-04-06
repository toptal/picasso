import type { ImportDeclaration } from 'jscodeshift'

import type { PackageMember } from './types'

/**
 * Finds import declarations for specific member of a package.
 *
 * @example
 * ``` typescript
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
