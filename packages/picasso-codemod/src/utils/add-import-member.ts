import type { Collection, Program } from 'jscodeshift'
import core from 'jscodeshift'

import { isSpecifierFor } from './is-specifier-for'
import type { PackageMember } from './types'

/**
 * Add an import for a package member on a file.
 * It dis expects at least 1 import to the package to be present in the file
 *
 * It searches for the last import for that package and the member to it.
 * It doesn't check if the member is been imported in other imports
 *
 * @example
 * ``` typescript
 * // file.ts (pre-codemod)
 * import { Foo } from '@toptal/picasso'
 *
 * // codemod.ts
 * addImportMember({ packageName: '@toptal/picasso', exportedName: 'Page' }, root)
 *
 * // file.ts (after codemod)
 * import { Foo, Page } from '@toptal/picasso'
 * ```
 */
export const addImportMember = (
  { packageName, exportedName }: PackageMember,
  root: Collection<Program>
) =>
  root
    .find(core.ImportDeclaration, { source: { value: packageName } })
    .at(-1)
    .forEach(({ node }) => {
      node.specifiers ??= []

      if (!node.specifiers.some(spec => isSpecifierFor(exportedName, spec))) {
        node.specifiers.push(
          core.importSpecifier(core.identifier(exportedName))
        )
      }
    })
