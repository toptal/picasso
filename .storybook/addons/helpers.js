export const waitForElements = (
  selector,
  waitFor = 1000,
  container = document
) => {
  let isExpired = false
  setTimeout(() => {
    isExpired = true
  }, waitFor)
  const checkElement = (resolve, reject) => {
    const resolvedElements = container.querySelectorAll(selector)

    if (isExpired) {
      console.warn(`Picasso was unable to find '${selector}' in ${waitFor}ms`)
      return reject(resolvedElements)
    }

    if (resolvedElements.length === 0) {
      requestAnimationFrame(() => checkElement(resolve, reject))
    } else {
      return resolve(resolvedElements)
    }
  }

  return new Promise(checkElement)
}
