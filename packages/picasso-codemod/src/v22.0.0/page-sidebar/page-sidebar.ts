import core, {
  Transform,
  JSCodeshift,
  Collection,
  ImportDeclaration
} from 'jscodeshift'

import {
  addImport,
  findComponents,
  findSpecifierForImport,
  isImportFor,
  isSpecifierFor
} from '../../utils'
import { PackageMember } from '../../utils/types'

const PICASSO_PACKAGE = '@toptal/picasso'

const OLD_PICASSO_SIDEBAR: PackageMember = {
  packageName: PICASSO_PACKAGE,
  exportedName: 'Sidebar'
}

const PICASSO_PAGE: PackageMember = {
  packageName: PICASSO_PACKAGE,
  exportedName: 'Page'
}

const transformImports = (root: Collection) => {
  const pageIdentifier = findSpecifierForImport(PICASSO_PAGE, root)

  if (pageIdentifier == null) {
    addImport(PICASSO_PAGE, root)
  }

  root
    .find(core.ImportDeclaration, decl =>
      isImportFor(OLD_PICASSO_SIDEBAR, decl)
    )
    .forEach(({ node }) => {
      node.specifiers = node.specifiers?.filter(
        spec => !isSpecifierFor(OLD_PICASSO_SIDEBAR.exportedName, spec)
      )
    })

  return {
    pageIdentifier: pageIdentifier?.imported.name
  }
}

const transformComponents = (
  sidebarIdentifier: string,
  pageIdentifier: string,
  root: Collection
) => {
  root
    .find(core.JSXIdentifier, { name: sidebarIdentifier })
    .replaceWith(() =>
      core.jsxMemberExpression(
        core.jsxIdentifier(pageIdentifier),
        core.jsxIdentifier('Sidebar')
      )
    )
}

const transform: Transform = (file, api) => {
  const j = api.jscodeshift
  const root = j(file.source)

  const sidebarImports = root.find(j.ImportDeclaration, decl =>
    isImportFor(OLD_PICASSO_SIDEBAR, decl)
  )

  if (sidebarImports.size() > 0) {
    const sidebarIdentifier =
      findSpecifierForImport(OLD_PICASSO_SIDEBAR, root)?.local?.name ??
      OLD_PICASSO_SIDEBAR.exportedName

    const { pageIdentifier } = transformImports(root)

    transformComponents(
      sidebarIdentifier,
      pageIdentifier ?? PICASSO_PAGE.exportedName,
      root
    )
  }

  return root.toSource()
}

export default transform
