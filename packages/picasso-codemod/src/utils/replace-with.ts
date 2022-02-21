import { Core, JSCodeshift } from 'jscodeshift'

const replaceWith = (
  prev: string,
  curr: string,
  root: ReturnType<Core>,
  j: JSCodeshift
) => {
  let replaced = false

  root
    .find(j.StringLiteral, ({ value }) => value.includes(prev))
    .map(path => {
      replaced = true
      path.value.value = path.value.value.replace(prev, curr)

      return path
    })

  return replaced
}

export { replaceWith }
