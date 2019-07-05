export default (value: string, str: string) => {
  return str.toLowerCase().includes(value.trim().toLowerCase())
}
