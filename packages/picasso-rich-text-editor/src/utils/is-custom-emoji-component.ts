const isCustomEmojiComponent = (componentProps: any) =>
  componentProps &&
  'data-src' in componentProps &&
  'data-emoji-name' in componentProps

export default isCustomEmojiComponent
