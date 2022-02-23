import { useCallback, useState } from 'react'

import { TextLengthChangeHandler } from '../../../QuillEditor'
import { CounterMessageSetter } from '../../RichTextEditor'

type Props = {
  minLength?: number
  maxLength?: number
  minLengthMessage?: CounterMessageSetter
  maxLengthMessage?: CounterMessageSetter
}

const getInitialCounterMessage = ({
  minLength,
  maxLength,
  minLengthMessage,
  maxLengthMessage
}: Props) => {
  if (minLength && minLengthMessage) {
    return minLengthMessage(minLength, 0).message
  }

  if (maxLength && maxLengthMessage) {
    return maxLengthMessage(maxLength, 0).message
  }

  return ''
}

const useCounter = ({
  minLength,
  maxLength,
  minLengthMessage,
  maxLengthMessage
}: Props) => {
  const [message, setMessage] = useState(() =>
    getInitialCounterMessage({
      minLength,
      maxLength,
      minLengthMessage,
      maxLengthMessage
    })
  )
  const [isError, setIsError] = useState(!!minLength)

  const handleCounterMessage: TextLengthChangeHandler = useCallback(
    currLength => {
      if (minLengthMessage && minLength) {
        if (currLength < minLength) {
          const { message, isError } = minLengthMessage(minLength, currLength)

          setMessage(message)
          setIsError(isError)

          return
        } else if (!maxLength) {
          const { message, isError } = minLengthMessage(minLength, currLength)

          setMessage(message)
          setIsError(isError)

          return
        }
      }

      if (maxLengthMessage && maxLength) {
        const { message, isError } = maxLengthMessage(maxLength, currLength)

        setMessage(message)
        setIsError(isError)
      }
    },
    [minLength, maxLength, minLengthMessage, maxLengthMessage]
  )

  return {
    counterMessage: message,
    counterError: isError,
    handleCounterMessage
  }
}

export default useCounter
