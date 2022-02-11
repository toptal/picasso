import { ASTPath, Core, ImportDeclaration, JSCodeshift } from 'jscodeshift'

const warnUsersAbout = (
  unsolvableImportDeclarations: ASTPath<ImportDeclaration>[],
  filePath: string
) => {
  const totalImports = unsolvableImportDeclarations.length

  if (totalImports > 0) {
    console.log(
      '\x1b[33m%s\x1b[0m',
      `[***] Unresolved import statement${totalImports > 1 ? 's' : ''}:`
    )
  }

  unsolvableImportDeclarations.forEach(elem => {
    if (elem.value.loc?.start) {
      const { line, column } = elem.value.loc?.start

      console.log(`${filePath}:${line}:${column}`)
    }
  })

  if (totalImports > 0) {
    console.log(
      '\x1b[33m%s\x1b[0m',
      '[***] There are some unresolved import statements, please fix them.'
    )
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

const getUnsolvableImportDeclarations = (
  target: string,
  root: ReturnType<Core>,
  j: JSCodeshift
) => {
  const unsolvableImportDeclarations: ASTPath<ImportDeclaration>[] = []

  root
    .find(j.ImportDeclaration, ({ source }) => source.value === target)
    .forEach(path => {
      // In our case, unsolvable import is import which has comments. We don't
      // know what user would like to do with those comments, thus, only the
      // user can can take actions.
      if (path.value.comments) {
        unsolvableImportDeclarations.push(path)
      }
    })

  return unsolvableImportDeclarations
}

const getUnsolvableIdentifierNames = (
  unsolvableImportDeclarations: ASTPath<ImportDeclaration>[]
) => {
  const unsolvableIdentifierNames: Set<string> = new Set()

  unsolvableImportDeclarations.forEach(path => {
    path.value.specifiers?.forEach(specifier =>
      unsolvableIdentifierNames.add(getSpecifierName(specifier))
    )
  })

  return unsolvableIdentifierNames
}

export {
  warnUsersAbout,
  getSpecifierName,
  getUnsolvableImportDeclarations,
  getUnsolvableIdentifierNames
}
