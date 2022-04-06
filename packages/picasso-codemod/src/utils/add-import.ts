import core, { Collection } from 'jscodeshift'

import { isSpecifierFor } from '.'
import { PackageMember } from './types'

export const addImport = (
  { packageName, exportedName }: PackageMember,
  root: Collection<unknown>
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
