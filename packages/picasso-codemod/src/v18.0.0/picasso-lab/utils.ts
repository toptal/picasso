import type { ASTPath, Core, ImportDeclaration, JSCodeshift } from 'jscodeshift'

const warnUsersAbout = (
  unsolvableImportDeclarations: ASTPath<ImportDeclaration>[],
  filePath: string
) => {
  const totalImports = unsolvableImportDeclarations.length

  if (totalImports > 0) {
    process.stdout.write(
      `\x1b[33m[***] Unresolved import statement${
        totalImports > 1 ? 's' : ''
      }:\x1b[0m\n`
    )
  }

  unsolvableImportDeclarations.forEach(elem => {
    if (elem.value.loc?.start) {
      const { line, column } = elem.value.loc.start

      process.stdout.write(`${filePath}:${line}:${column}\n`)
    }
  })

  if (totalImports > 0) {
    process.stdout.write(
      '\x1b[33m[***] There are some unresolved import statements, please fix them.\x1b[0m\n'
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
  const unsolvableIdentifierNames = new Set<string>()

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
  getUnsolvableIdentifierNames,
}
