import { JSCodeshift, Transform } from 'jscodeshift'

// type Specifier = ImportDefaultSpecifier | ImportSpecifier

const isPicassoImport = (node: any) =>
  node.source.value === '@toptal/picasso' ||
  node.source.value.match(/^(@toptal\/picasso\/.*)$/)

const createImport = (
  j: JSCodeshift,
  specifier: string,
  moduleSpecifier: string
) => {
  return j.importDeclaration(
    [j.importDefaultSpecifier(j.identifier(specifier))],
    j.stringLiteral(moduleSpecifier)
  )
}

// TODO: sort imports also
// TODO: condition for different kinds of imports
// NAME COLLISIONS
const transform: Transform = (file, api) => {
  const j = api.jscodeshift
  const root = j(file.source)
  const importsMap = new Map()

  root
    .find(j.StringLiteral, ({ value }) => value.includes('picasso-lab'))
    .map(path => {
      path.value.value = path.value.value.replace('picasso-lab', 'picasso')

      return path
    })

  root
    .find(j.ImportDeclaration, isPicassoImport)
    .forEach(path => {
      const moduleSpecifier = path.value.source.value
      const specifiers =
        path.value.specifiers?.map(specifier => ({
          name: specifier.local?.name,
          type: specifier.type
        })) || []

      if (importsMap.has(moduleSpecifier)) {
        importsMap.set(moduleSpecifier, [
          ...importsMap.get(moduleSpecifier),
          ...specifiers
        ])
      } else {
        importsMap.set(moduleSpecifier, specifiers)
      }

      return path
    })
    .remove()

  for (const [key, value] of importsMap) {
    value.forEach((specifier: any) => {
      root
        .find(j.Declaration)
        .at(0)
        .get()
        .insertBefore(createImport(j, specifier.name, key))
    })
  }

  console.log(importsMap)

  return root.toSource({ quote: 'single' })
}

export default transform
