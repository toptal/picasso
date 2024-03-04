const isSubstring = (subStr: string, str: string) =>
  str.toLowerCase().includes(subStr.trim().toLowerCase())

export default isSubstring
