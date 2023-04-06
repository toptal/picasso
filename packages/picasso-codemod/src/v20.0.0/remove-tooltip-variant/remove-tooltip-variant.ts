import type {
  ImportDeclaration,
  ImportDefaultSpecifier,
  ImportNamespaceSpecifier,
  ImportSpecifier,
  JSXAttribute,
  Transform,
} from 'jscodeshift'

import { isImportByPath } from '../../utils'

const COMPONENT_NAME = 'Tooltip'
const PROP_NAME = 'variant'

const isSpecifierTooltip = (
  specifier: ImportSpecifier | ImportNamespaceSpecifier | ImportDefaultSpecifier
) => {
  return (
    specifier.type === 'ImportSpecifier' &&
    specifier.imported?.name === COMPONENT_NAME
  )
}

const isPicassoTooltipImport = (node: ImportDeclaration) =>
  isImportByPath(node, '@toptal/picasso') &&
  !!node.specifiers?.some(specifier => isSpecifierTooltip(specifier))

const isVariantAttribute = (path: JSXAttribute) => {
  return path.name?.name === PROP_NAME
}

const transform: Transform = (file, api) => {
  const j = api.jscodeshift
  const root = j(file.source)
  const localSpecifiers: string[] = []

  root.find(j.ImportDeclaration, isPicassoTooltipImport).forEach(path => {
    const specifiers = path.value.specifiers

    specifiers?.forEach(specifier => {
      if (isSpecifierTooltip(specifier) && specifier.local?.name) {
        localSpecifiers.push(specifier.local?.name)
      }
    })
  })

  localSpecifiers.forEach(specifier => {
    root
      .findJSXElements(specifier)
      .find(j.JSXAttribute, isVariantAttribute)
      .filter(path => {
        // filter only specifiered components and exclude children components
        return (
          path.parentPath.parentPath.value.type === 'JSXOpeningElement' &&
          path.parentPath.parentPath.value.name.name === specifier
        )
      })
      .remove()
  })

  return root.toSource({ quote: 'single' })
}

export default transform
