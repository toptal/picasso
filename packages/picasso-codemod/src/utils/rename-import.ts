import { RootType, JSCodeshift } from './types'

const renameImport = (
  from: string,
  to: string,
  root: RootType,
  j: JSCodeshift
) => {
  root.find(j.ImportSpecifier).forEach(el => {
    if (el.value.imported.name === from) {
      el.value.imported.name = to
    }
  })
}

export { renameImport }
