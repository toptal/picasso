const removeClasses = (value: string) => value.replace(/\sclass=".+?"/g, '')

export default removeClasses
