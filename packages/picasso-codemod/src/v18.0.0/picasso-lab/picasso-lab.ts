/**
 * This codemod replaces references to `picasso-lab` with `picasso`.
 *
 * After replacing, we might have multiple import instances of
 * `@toptal/picasso`, and we should combine them into one.
 *
 * import [@specifier] from [@moduleSpecifier]
 *
 * @specifier:
 *   * as Component - ImportNamespaceSpecifier
 *   { Component } - ImportSpecifier
 *   Component - ImportDefaultSpecifier
 * @moduleSpecifier: string
 *
 *
 * Steps:
 *  1. replace `picasso-lab` with `picasso`
 *  2. get all `@toptal/picasso` modules (child modules as well) and remove all
 *  of them, except namespace modules
 *  3. combine `@toptal/picasso` (child modules as well) modules respectively
 *  4. insert at the beginning of the file
 *
 *  child modules - `@toptal/picasso/utils`, `@toptal/picasso/Icon`,
 *  `@toptal/picasso/test-utils`
 *
 *  IMPORTANT: Does not cover edge cases for comments and namespace imports.
 */

import {
  Core,
  ImportDefaultSpecifier,
  ImportNamespaceSpecifier,
  ImportSpecifier,
  Transform,
  ImportDeclaration,
  JSCodeshift,
  Specifier as JSCodeshiftSpecifier
} from 'jscodeshift'

import { replaceWith, isImportByPath, hasTopLevelComment } from '../../utils'

type ImportTypes =
  | ImportSpecifier
  | ImportDefaultSpecifier
  | ImportNamespaceSpecifier

interface Specifier {
  name: string
  type:
    | 'ImportSpecifier'
    | 'ImportDefaultSpecifier'
    | 'ImportNamespaceSpecifier'
}

type CommentsType = JSCodeshiftSpecifier['comments']
type ImportsMapValueType = { specifiers: Specifier[]; comments: CommentsType }
type ImportsMapType = Map<string, ImportsMapValueType>

const isPicassoImport = (node: ImportDeclaration) =>
  isImportByPath(node, '@toptal/picasso')

const createImport = (
  specifiers: Specifier[],
  moduleSpecifier: string,
  j: JSCodeshift
) => {
  const imports: ImportTypes[] = []
  const module = j.stringLiteral(moduleSpecifier)

  specifiers.forEach(specifier => {
    const identifier = j.identifier(specifier.name)

    if (specifier.type === 'ImportDefaultSpecifier') {
      imports.push(j.importDefaultSpecifier(identifier))
    } else if (specifier.type === 'ImportSpecifier') {
      imports.push(j.importSpecifier(identifier))
    }
  })

  return j.importDeclaration(imports, module)
}

const insertImports = (
  importsMap: ImportsMapType,
  root: ReturnType<Core>,
  j: JSCodeshift
) => {
  const _hastTopLevelComment = hasTopLevelComment(root, j)

  for (const [moduleSpecifier, { specifiers, comments }] of importsMap) {
    const imports = createImport(specifiers, moduleSpecifier, j)

    if (_hastTopLevelComment) {
      root.find(j.Declaration).at(0).insertAfter(imports)
    } else {
      root.get().program.body.unshift(imports)
    }

    imports.comments = comments
  }
}

const getSpecifierName = (specifier: any) => {
  const name = specifier.local!.name

  if (specifier.type === 'ImportSpecifier') {
    const identifierName = specifier.imported.loc!.identifierName

    return identifierName && identifierName === name
      ? name
      : `${identifierName} as ${name}`
  }

  return name
}

const getImportsMap = (
  filter: (node: ImportDeclaration) => boolean,
  root: ReturnType<Core>,
  j: JSCodeshift
) => {
  const importsMap: ImportsMapType = new Map()

  root.find(j.ImportDeclaration, filter).forEach(path => {
    const moduleSpecifier = path.value.source.value as string
    const comments = path.value.comments || []
    const specifiers: Specifier[] =
      path.value.specifiers?.map(specifier => ({
        name: getSpecifierName(specifier),
        type: specifier.type
      })) || []

    if (importsMap.has(moduleSpecifier)) {
      const currImport = importsMap.get(moduleSpecifier)!
      const prevSpecifiers = currImport.specifiers || []
      const prevComments = currImport.comments || []

      importsMap.set(moduleSpecifier, {
        specifiers: [...prevSpecifiers, ...specifiers],
        comments: [...prevComments, ...comments]
      })
    } else {
      importsMap.set(moduleSpecifier, { specifiers, comments })
    }

    return path
  })

  return importsMap
}

const removeNonNamespaceImports = (root: ReturnType<Core>, j: JSCodeshift) => {
  root
    .find(j.ImportDeclaration, isPicassoImport)
    .filter(
      path => path.value.specifiers![0].type !== 'ImportNamespaceSpecifier'
    )
    .remove()
}

const transform: Transform = (file, api) => {
  const j = api.jscodeshift
  const root: ReturnType<Core> = j(file.source)

  replaceWith('picasso-lab', 'picasso', root, j)
  const importsMap = getImportsMap(isPicassoImport, root, j)

  removeNonNamespaceImports(root, j)

  insertImports(importsMap, root, j)

  return root.toSource({ quote: 'single' })
}

export default transform
