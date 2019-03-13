export const waitForElement = (selector, waitFor = 1000) => {
  let isExpired = false
  setTimeout(() => {
    isExpired = true
  }, waitFor)
  const checkElement = (resolve, reject) => {
    const resolvedElements = document.querySelectorAll(selector)

    if (isExpired) {
      console.error(`Picasso was unable to find '${selector}' in ${waitFor}ms`)
      return reject(resolvedElements)
    }

    if (
      !resolvedElements ||
      resolvedElements === null ||
      resolvedElements.length === 0
    ) {
      requestAnimationFrame(() => checkElement(resolve, reject))
    } else {
      return resolve(resolvedElements)
    }
  }

  return new Promise(checkElement)
}
