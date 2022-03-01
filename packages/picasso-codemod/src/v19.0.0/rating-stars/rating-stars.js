const transform = (file, api) => {
  const j = api.jscodeshift
  const root = j(file.source)

  const findImportsFor = (importPath, exportName) =>
    root.find(
      j.ImportDeclaration,
      ({ source, specifiers }) =>
        source.value === importPath &&
        specifiers.some(({ imported }) => imported.name === exportName)
    )

  const imports = findImportsFor('@picasso/components', 'Rating')

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

  return root.toSource()
}

export default transform
