import type { Transform } from 'jscodeshift'

const transform: Transform = (file, api) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const j = api.jscodeshift
  // const root = j(file.source)
}

export default transform
