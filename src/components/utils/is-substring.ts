export default (subStr: string, str: string) => {
  return str.toLowerCase().includes(subStr.trim().toLowerCase())
}
