export default (value: string | null, str: string) => {
  const query = (value || '').trim().toLowerCase()

  return str.toLowerCase().includes(query)
}
