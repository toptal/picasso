import { useCallback, useState } from 'react'

import { TextLengthChangeHandler } from '../../../QuillEditor'

type Props = {
  minlength?: number
  maxlength?: number
  minLengthMessage?: (minLength: number, currLength: number) => string
  maxLengthMessage?: (maxLength: number, currLength: number) => string
}

const getInitialCounterMessage = ({
  minlength,
  maxlength,
  minLengthMessage,
  maxLengthMessage
}: Props) => {
  if (minlength && minLengthMessage) {
    return minLengthMessage(minlength, 0)
  }

  if (maxlength && maxLengthMessage) {
    return maxLengthMessage(maxlength, 0)
  }

  return ''
}

const useCounter = ({
  minlength,
  maxlength,
  minLengthMessage,
  maxLengthMessage
}: Props) => {
  const [counterMessage, setCounterMessage] = useState(() =>
    getInitialCounterMessage({
      minlength,
      maxlength,
      minLengthMessage,
      maxLengthMessage
    })
  )

  const handleCounterMessage: TextLengthChangeHandler = useCallback(
    currLength => {
      if (minLengthMessage && minlength && currLength <= minlength) {
        setCounterMessage(minLengthMessage(minlength, currLength))
      }

      if (maxLengthMessage && maxlength && currLength <= maxlength) {
        if (!minlength || (minlength && minlength <= currLength)) {
          setCounterMessage(maxLengthMessage(maxlength, currLength))
        }
      }
    },
    [minlength, maxlength, minLengthMessage, maxLengthMessage]
  )

  return { counterMessage, handleCounterMessage }
}

export default useCounter
