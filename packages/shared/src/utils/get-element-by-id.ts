const getElementById = (id: string): null | HTMLElement => {
  if (typeof document === 'undefined') {
    return null
  }

  return document.getElementById(id)
}

export default getElementById
