import { findComponents } from '../../utils/find-components'

const findImportsFor = (root, j) => (importPath, exportName) =>
  root.find(
    j.ImportDeclaration,
    ({ source, specifiers }) =>
      source.value === importPath &&
      specifiers.some(({ imported }) => imported?.name === exportName)
  )

const transformPicassoMain = (root, j) => {
  const imports = findImportsFor(root, j)('@toptal/picasso', 'Rating')

  if (imports.size()) {
    const ratings = root.findJSXElements('Rating')

    // Should find both opening and closing identifiers
    ratings
      .find(j.JSXIdentifier, { name: 'Rating' })
      .replaceWith(() =>
        j.jsxMemberExpression(
          j.jsxIdentifier('Rating'),
          j.jsxIdentifier('Stars')
        )
      )
  }
}

const transformPicassoForms = (root, j) => {
  const imports = findImportsFor(root, j)('@toptal/picasso-forms', 'Form')

  if (imports.size()) {
    const els = findComponents('Form.Rating', root, j)

    els
      .find(j.JSXMemberExpression, {
        object: { name: 'Form' },
        property: { name: 'Rating' },
      })
      .replaceWith(() =>
        j.jsxMemberExpression(
          j.jsxMemberExpression(
            j.jsxIdentifier('Form'),
            j.jsxIdentifier('Rating')
          ),
          j.jsxIdentifier('Stars')
        )
      )
  }
}

const transform = (file, api) => {
  const j = api.jscodeshift
  const root = j(file.source)

  transformPicassoMain(root, j)
  transformPicassoForms(root, j)

  return root.toSource()
}

export default transform
