export const getHamburgerContainer = () => {
  if (typeof document === 'undefined') {
    return null
  }

  return document.getElementById('hamburger')
}
