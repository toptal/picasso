export const getHamburgerContainer = (hamburgerId: string) => {
  if (typeof document === 'undefined') {
    return null
  }

  return document.getElementById(hamburgerId)
}
