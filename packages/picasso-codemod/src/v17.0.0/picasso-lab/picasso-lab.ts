import { Transform } from 'jscodeshift'
const transform: Transform = (file, api) => {
  const j = api.jscodeshift

  return j(file.source)
    .find(j.StringLiteral)
    .forEach(path => path.value.value.includes('picasso-lab'))
    .map(path => {
      path.value.value.replace('picasso-lab', 'picasso')

      return path
    })
    .toSource({ quote: 'single' })
}

export default transform
