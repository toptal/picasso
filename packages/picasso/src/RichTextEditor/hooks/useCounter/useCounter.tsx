import { useCallback, useState } from 'react'

import { TextLengthChangeHandler } from '../../../QuillEditor'

type Props = {
  minlength?: number
  maxlength?: number
  getMinLengthMessage?: (minLength: number, currLength: number) => string
  getMaxLengthMessage?: (maxLength: number, currLength: number) => string
}

const getMessageForMinLength = (
  minlength: number,
  currLength: number,
  getMinLengthMessage: Props['getMinLengthMessage']
) => {
  if (getMinLengthMessage) {
    return getMinLengthMessage(minlength, currLength)
  }

  return `${minlength} characters required, current count is ${
    minlength - currLength
  }`
}

const getMessageForMaxLength = (
  maxlength: number,
  currLength: number,
  getMaxLengthMessage: Props['getMaxLengthMessage']
) => {
  if (getMaxLengthMessage) {
    return getMaxLengthMessage(maxlength, currLength)
  }

  return `${maxlength - currLength} characters left`
}

const getInitialCounterMessage = ({
  minlength,
  maxlength,
  getMinLengthMessage,
  getMaxLengthMessage
}: Props) => {
  if (minlength) {
    return getMessageForMinLength(minlength, 0, getMinLengthMessage)
  }

  if (maxlength) {
    return getMessageForMaxLength(maxlength, 0, getMaxLengthMessage)
  }

  return ''
}

const useCounter = ({
  minlength,
  maxlength,
  getMinLengthMessage,
  getMaxLengthMessage
}: Props) => {
  const [counterMessage, setCounterMessage] = useState(() =>
    getInitialCounterMessage({
      minlength,
      maxlength,
      getMinLengthMessage,
      getMaxLengthMessage
    })
  )

  const handleCounterMessage: TextLengthChangeHandler = useCallback(
    currLength => {
      if (minlength && currLength <= minlength) {
        setCounterMessage(
          getMessageForMinLength(minlength, currLength, getMinLengthMessage)
        )
      }

      if (maxlength && currLength <= maxlength) {
        if (!minlength || (minlength && minlength <= currLength)) {
          setCounterMessage(
            getMessageForMaxLength(maxlength, currLength, getMaxLengthMessage)
          )
        }
      }
    },
    [minlength, maxlength, getMinLengthMessage, getMaxLengthMessage]
  )

  return { counterMessage, handleCounterMessage }
}

export default useCounter
