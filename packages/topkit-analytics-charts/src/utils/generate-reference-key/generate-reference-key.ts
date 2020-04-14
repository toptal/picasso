const generateReferenceKey = (postfix: string | number): string =>
  `reference-${postfix}`

export default generateReferenceKey
