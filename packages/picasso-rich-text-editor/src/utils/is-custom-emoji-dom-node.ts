const isCustomEmojiDOMNode = (element: HTMLElement) => {
  const { dataset } = element

  return dataset && 'src' in dataset && 'emojiName' in dataset
}

export default isCustomEmojiDOMNode
