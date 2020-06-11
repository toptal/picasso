export default (fullName: string) => {
  return fullName
    .split(' ')
    .map(word => {
      if (word === '' || word.length <= 1) {
        return ''
      }

      return word[0]
    })
    .join('')
    .slice(0, 3)
}
