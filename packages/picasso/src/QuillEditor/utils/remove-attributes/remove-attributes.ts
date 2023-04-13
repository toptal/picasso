const removeAttributes = (value: string) =>
  value.replace(/\s(class|dir|value)=".*?"/g, '')

export default removeAttributes
