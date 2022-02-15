import { useCallback, useState } from 'react'

import { TextLengthChangeHandler } from '../../../QuillEditor'

type Props = {
  minLength?: number
  maxLength?: number
  minLengthMessage?: (minLength: number, currLength: number) => string
  maxLengthMessage?: (maxLength: number, currLength: number) => string
}

const getInitialCounterMessage = ({
  minLength,
  maxLength,
  minLengthMessage,
  maxLengthMessage
}: Props) => {
  if (minLength && minLengthMessage) {
    return minLengthMessage(minLength, 0)
  }

  if (maxLength && maxLengthMessage) {
    return maxLengthMessage(maxLength, 0)
  }

  return ''
}

const useCounter = ({
  minLength,
  maxLength,
  minLengthMessage,
  maxLengthMessage
}: Props) => {
  const [counterMessage, setCounterMessage] = useState(() =>
    getInitialCounterMessage({
      minLength,
      maxLength,
      minLengthMessage,
      maxLengthMessage
    })
  )

  const handleCounterMessage: TextLengthChangeHandler = useCallback(
    currLength => {
      if (minLengthMessage && minLength && currLength <= minLength) {
        setCounterMessage(minLengthMessage(minLength, currLength))
      }

      if (maxLengthMessage && maxLength && currLength <= maxLength) {
        if (!minLength || (minLength && minLength <= currLength)) {
          setCounterMessage(maxLengthMessage(maxLength, currLength))
        }
      }
    },
    [minLength, maxLength, minLengthMessage, maxLengthMessage]
  )

  return { counterMessage, handleCounterMessage }
}

export default useCounter
