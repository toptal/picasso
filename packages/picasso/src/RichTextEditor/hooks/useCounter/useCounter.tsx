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
  const [error, setError] = useState(!!minLength)

  const handleCounterMessage: TextLengthChangeHandler = useCallback(
    currLength => {
      if (minLengthMessage && minLength) {
        if (currLength < minLength) {
          setCounterMessage(minLengthMessage(minLength, currLength))
          setError(true)

          return
        } else if (!maxLength) {
          setCounterMessage(minLengthMessage(minLength, currLength))
          setError(false)

          return
        }
      }

      if (maxLengthMessage && maxLength) {
        if (currLength < maxLength) {
          setError(false)
        } else {
          setError(true)
        }

        setCounterMessage(maxLengthMessage(maxLength, currLength))
      }
    },
    [minLength, maxLength, minLengthMessage, maxLengthMessage]
  )

  return { counterMessage, error, handleCounterMessage }
}

export default useCounter
