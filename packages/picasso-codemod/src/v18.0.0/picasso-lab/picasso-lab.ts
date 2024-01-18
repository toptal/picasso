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
 *  child modules - `@toptal/picasso-utils`, `@toptal/picasso/Icon`,
 *  `@toptal/picasso-test-utils`
 *
 *  IMPORTANT: Does not cover edge cases for comments and namespace imports.
 */

import type {
  Core,
  ImportDefaultSpecifier,
  ImportNamespaceSpecifier,
  ImportSpecifier,
  Transform,
  ImportDeclaration,
  JSCodeshift,
} from 'jscodeshift'

import { replaceWith, isImportByPath, hasTopLevelComment } from '../../utils'
import {
  warnUsersAbout,
  getSpecifierName,
  getUnsolvableImportDeclarations,
  getUnsolvableIdentifierNames,
} from './utils'

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

type ImportsMapValueType = { specifiers: Specifier[] }
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

  for (const [moduleSpecifier, { specifiers }] of importsMap) {
    const imports = createImport(specifiers, moduleSpecifier, j)

    if (_hastTopLevelComment) {
      root.find(j.Declaration).at(0).insertAfter(imports)
    } else {
      root.get().node.program.body.unshift(imports)
    }
  }
}

const getImportsMap = (
  unsolvableIdentifierNames: Set<string>,
  filter: (node: ImportDeclaration) => boolean,
  root: ReturnType<Core>,
  j: JSCodeshift
) => {
  const importsMap: ImportsMapType = new Map()

  root.find(j.ImportDeclaration, filter).forEach(path => {
    const moduleSpecifier = path.value.source.value as string
    const specifiers: Specifier[] = []

    path.value.specifiers?.forEach(specifier => {
      const specifierName = getSpecifierName(specifier)

      if (!unsolvableIdentifierNames.has(specifierName)) {
        specifiers.push({
          name: specifierName,
          type: specifier.type,
        })
      }
    })

    if (importsMap.has(moduleSpecifier)) {
      const currImport = importsMap.get(moduleSpecifier)!
      const prevSpecifiers = currImport.specifiers || []

      importsMap.set(moduleSpecifier, {
        specifiers: [...prevSpecifiers, ...specifiers],
      })
    } else {
      importsMap.set(moduleSpecifier, { specifiers })
    }

    return path
  })

  return importsMap
}

const removeNonNamespaceImports = (
  unsolvableIdentifierNames: Set<string>,
  root: ReturnType<Core>,
  j: JSCodeshift
) => {
  root
    .find(j.ImportDeclaration, isPicassoImport)
    .filter(
      path =>
        !unsolvableIdentifierNames.has(
          getSpecifierName(path.value.specifiers![0])
        )
    )
    .filter(
      path => path.value.specifiers![0].type !== 'ImportNamespaceSpecifier'
    )
    .remove()
}

const transform: Transform = (file, api) => {
  const j = api.jscodeshift
  const root: ReturnType<Core> = j(file.source)

  const unsolvableImportDeclarations = getUnsolvableImportDeclarations(
    '@toptal/picasso-lab',
    root,
    j
  )
  const unsolvableIdentifierNames = getUnsolvableIdentifierNames(
    unsolvableImportDeclarations
  )

  const replaced = replaceWith('picasso-lab', 'picasso', root, j)
  const importsMap = getImportsMap(
    unsolvableIdentifierNames,
    isPicassoImport,
    root,
    j
  )

  if (replaced) {
    removeNonNamespaceImports(unsolvableIdentifierNames, root, j)
    insertImports(importsMap, root, j)
    warnUsersAbout(unsolvableImportDeclarations, file.path)
  }

  return root.toSource({ quote: 'single' })
}

export default transform
