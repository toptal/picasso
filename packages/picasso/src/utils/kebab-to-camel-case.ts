/* eslint-disable import/no-extraneous-dependencies */
/**
 * @deprecated Use kebabToCamelCase() from @toptal/picasso-provider package
 */
const kebabToCamelCase = (str: string) =>
  str.replace(/-([a-z])/g, (substring: string) => substring[1].toUpperCase())

export default kebabToCamelCase
