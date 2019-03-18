const template = (
  { template },
  opts,
  { imports, componentName, props, jsx, exports }
) => {
  const displayName = `'${componentName.name}'`

  return template.ast`
    ${imports}
    const ${componentName} = (${props}) => ${jsx}
    ${componentName}.displayName = ${displayName}
    ${exports}
  `
}

module.exports = template
