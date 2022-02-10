import { ImportDeclaration } from 'jscodeshift'

/**
 * Usage:
 *
 *  j(file.source)
 *    .find(j.ImportDeclaration, (node) => isSpecifiedImport(node, 'module/name'))
 */
const isImportByPath = (node: ImportDeclaration, moduleSpecifier: string) => {
  if (typeof node.source.value === 'string') {
    return (
      node.source.value === moduleSpecifier ||
      node.source.value.startsWith(`${moduleSpecifier}/`)
    )
  }

  return false
}

export { isImportByPath }
