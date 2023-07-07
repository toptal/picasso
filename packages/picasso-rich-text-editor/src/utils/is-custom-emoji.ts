// Determine if the element is a custom emoji
// based on the presence of the `src` and `emojiName` attributes either in the
// element's `dataset` or in the `props` object for React Component.
const isCustomEmoji = (elementOrProps: HTMLElement | object) => {
  if (elementOrProps instanceof HTMLElement) {
    const { dataset } = elementOrProps

    return dataset && 'src' in dataset && 'emojiName' in dataset
  }

  return (
    elementOrProps &&
    'data-src' in elementOrProps &&
    'data-emoji-name' in elementOrProps
  )
}

export default isCustomEmoji
