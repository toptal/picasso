import { Core, JSCodeshift } from 'jscodeshift'

const replaceWith = (
  prev: string,
  curr: string,
  root: ReturnType<Core>,
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
