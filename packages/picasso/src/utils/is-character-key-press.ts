import { KeyboardEvent } from 'react'

// eslint-disable-next-line complexity
export default (event: KeyboardEvent) => {
  if (typeof event.which === 'undefined') {
    // This is IE, which only fires keypress events for printable keys
    return true
  } else if (typeof event.which === 'number' && event.which > 0) {
    // In other browsers except old versions of WebKit, event.which is
    // only greater than zero if the keypress is a printable key.
    // We need to filter out backspace and ctrl/alt/meta key combinations
    return (
      !event.ctrlKey && !event.metaKey && !event.altKey && event.which !== 8
    )
  }

  return false
}
