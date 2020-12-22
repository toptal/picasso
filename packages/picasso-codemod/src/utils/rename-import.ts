/* eslint-disable id-length */
import { Core, JSCodeshift } from 'jscodeshift'

const renameImport = (
  from: string,
  to: string,
  root: ReturnType<Core>,
  j: JSCodeshift
) => {
  root.find(j.ImportSpecifier).forEach(el => {
    if (el.value.imported.name === from) {
      el.value.imported.name = to
    }
  })
}

export { renameImport }
