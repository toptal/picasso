import core, { Collection, ImportSpecifier } from 'jscodeshift'

import { PackageMember } from './types'

export const findSpecifierForImport = (
  { packageName, exportedName }: PackageMember,
  col: Collection
): ImportSpecifier | undefined =>
  col
    .find(core.ImportDeclaration, { source: { value: packageName } })
    .find(core.ImportSpecifier, { imported: { name: exportedName } })
    .at(-1)
    .nodes()[0]
