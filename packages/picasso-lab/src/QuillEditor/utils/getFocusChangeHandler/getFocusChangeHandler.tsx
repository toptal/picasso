import Quill, { SelectionChangeHandler } from 'quill'

const getFocusChangeHandler = (
  quill: Quill,
  handleFocusChange: (isFocused: boolean) => void
) => {
  const handler: SelectionChangeHandler = (range, _, source) => {
    const isSilenetEvent = source === 'silent'

    if (isSilenetEvent) {
      return
    }

    if (range) {
      handleFocusChange(true)
    } else {
      handleFocusChange(false)
    }
  }

  return handler
}

export default getFocusChangeHandler
