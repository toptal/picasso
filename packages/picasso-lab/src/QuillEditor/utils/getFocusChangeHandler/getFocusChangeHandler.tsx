import { SelectionChangeHandler } from 'quill'

const getFocusChangeHandler = (
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
