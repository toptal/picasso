import type { Transform, Collection } from 'jscodeshift'
import core from 'jscodeshift'

import {
  addImportMember,
  findSpecifierForImport,
  isImportFor,
  isSpecifierFor,
} from '../../utils'
import type { PackageMember } from '../../utils/types'

const PICASSO_FORMS_PACKAGE = '@toptal/picasso-forms'

const OLD_PICASSO_FORM: PackageMember = {
  packageName: PICASSO_FORMS_PACKAGE,
  exportedName: 'Form',
}

const NEW_PICASSO_FORM: PackageMember = {
  packageName: PICASSO_FORMS_PACKAGE,
  exportedName: 'FormNonCompound',
}

const transformMainImports = (root: Collection) => {
  const picassoFormsIdentifier = findSpecifierForImport(NEW_PICASSO_FORM, root)

  if (picassoFormsIdentifier == null) {
    addImportMember(NEW_PICASSO_FORM, root)
  }

  root
    .find(core.ImportDeclaration, decl => isImportFor(OLD_PICASSO_FORM, decl))
    .forEach(({ node }) => {
      node.specifiers = node.specifiers?.filter(
        spec => !isSpecifierFor(OLD_PICASSO_FORM.exportedName, spec)
      )
    })

  return {
    picassoFormsIdentifier: picassoFormsIdentifier?.imported.name,
  }
}

const transformComponents = (
  formsPackageIdentifier: string,
  newPackageIdentifier: string,
  root: Collection
) => {
  const transformedComponents: string[] = []

  // Find all core.JSXMemberExpression for nested components
  root
    .find(core.JSXMemberExpression, {
      object: { name: formsPackageIdentifier },
    })
    .replaceWith(node => {
      const name = node.value.property.name

      transformedComponents.push(name)

      return core.jsxIdentifier(name)
    })

  // Find all core.JSXIdentifier for main `Form` components
  root
    .find(core.JSXIdentifier, { name: formsPackageIdentifier })
    .replaceWith(() => core.jsxIdentifier(newPackageIdentifier))

  transformedComponents.forEach(exportedName => {
    addImportMember({ packageName: PICASSO_FORMS_PACKAGE, exportedName }, root)
  })
}

const transform: Transform = (file, api) => {
  const j = api.jscodeshift
  const root = j(file.source)

  const formImports = root.find(j.ImportDeclaration, decl =>
    isImportFor(OLD_PICASSO_FORM, decl)
  )

  if (formImports.size() > 0) {
    const formsPackageIdentifier =
      findSpecifierForImport(OLD_PICASSO_FORM, root)?.local?.name ??
      OLD_PICASSO_FORM.exportedName

    // Get current import declaration for the case of aliased imports
    // Transform the main `Form` imports to be `FormNonCompound`
    const { picassoFormsIdentifier } = transformMainImports(root)

    transformComponents(
      formsPackageIdentifier,
      picassoFormsIdentifier ?? NEW_PICASSO_FORM.exportedName,
      root
    )
  }

  return root.toSource()
}

export default transform
