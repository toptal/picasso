import type { Collection, ImportSpecifier, Program } from 'jscodeshift'
import core from 'jscodeshift'

import type { PackageMember } from './types'

/**
 * Find the specifier for a package member on the file if it exists.
 * Useful for getting aliases in imports if any
 *
 * @example
 * ``` typescript
 * // file.ts
 * import { Page as PicassoPage } from '@toptal/picasso'
 *
 * // codemod.ts
 * const specifier = findSpecifierForImport({ packageName: '@toptal/picasso', exportedName: 'Page' }, root)
 * // This would return the specifier, from which you could get the aliased name by running
 * const localName = specifier?.local?.name ?? specifier.imported.name
 * ```
 */
export const findSpecifierForImport = (
  { packageName, exportedName }: PackageMember,
  col: Collection<Program>
): ImportSpecifier | undefined =>
  col
    .find(core.ImportDeclaration, { source: { value: packageName } })
    .find(core.ImportSpecifier, { imported: { name: exportedName } })
    .at(-1)
    .nodes()[0]
