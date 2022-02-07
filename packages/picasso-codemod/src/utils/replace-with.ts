import { RootType, JSCodeshift } from './types'

const replaceWith = (
  prev: string,
  curr: string,
  root: RootType,
  j: JSCodeshift
) => {
  root
    .find(j.StringLiteral, ({ value }) => value.includes(prev))
    .map(path => {
      path.value.value = path.value.value.replace(prev, curr)

      return path
    })
}

export { replaceWith }
