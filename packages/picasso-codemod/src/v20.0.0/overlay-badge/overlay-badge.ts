import {
  ASTPath,
  Collection,
  ImportDeclaration,
  JSCodeshift,
  JSXElement,
  Transform,
} from 'jscodeshift'

const PREVIOUS_ELEMENT_NAME = 'OverlayBadge'
const NEW_ELEMENT_NAME = 'Badge'

let j: JSCodeshift
let root: Collection

const findImportsFor = (importPath: string, exportName: string) =>
  root.find(
    j.ImportDeclaration,
    ({ source, specifiers }) =>
      source.value === importPath &&
      (specifiers ?? []).some(
        imp =>
          imp.type === 'ImportSpecifier' && imp.imported.name === exportName
      )
  )

const patchImports = (imports: Collection<ImportDeclaration>) => {
  imports
    .find(j.ImportSpecifier, { imported: { name: PREVIOUS_ELEMENT_NAME } })
    .forEach(path => {
      path.node.imported.name = NEW_ELEMENT_NAME
    })
}

const addSizeMediumByDefaultWhenMissing = () => {
  const isMissingSizeAttr = (path: ASTPath<JSXElement>) =>
    !path.node.openingElement.attributes?.some(
      attr => attr.type === 'JSXAttribute' && attr.name.name === 'size'
    )

  const addMediumSizeAttr = (path: ASTPath<JSXElement>) => {
    path.node.openingElement.attributes ??= []
    path.node.openingElement.attributes.unshift(
      j.jsxAttribute(j.jsxIdentifier('size'), j.stringLiteral('medium'))
    )
  }

  root
    .findJSXElements(PREVIOUS_ELEMENT_NAME)
    .filter(isMissingSizeAttr)
    .forEach(addMediumSizeAttr)
}

const patchJsxElements = () => {
  root
    .findJSXElements(PREVIOUS_ELEMENT_NAME)
    .find(j.JSXIdentifier, { name: PREVIOUS_ELEMENT_NAME })
    .replaceWith(() => j.jsxIdentifier(NEW_ELEMENT_NAME))
}

const transform: Transform = (file, api) => {
  j = api.jscodeshift
  root = j(file.source)

  const imports = findImportsFor('@toptal/picasso', PREVIOUS_ELEMENT_NAME)

  if (imports.size() > 0) {
    addSizeMediumByDefaultWhenMissing()
    patchImports(imports)
    patchJsxElements()
  }

  return root.toSource()
}

export default transform
