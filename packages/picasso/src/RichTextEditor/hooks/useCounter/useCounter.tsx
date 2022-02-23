import { useCallback, useState } from 'react'

import { TextLengthChangeHandler } from '../../../QuillEditor'
import { CounterMessageSetter } from '../../RichTextEditor'

type Props = {
  minLength?: number
  maxLength?: number
  minLengthMessage?: CounterMessageSetter
  maxLengthMessage?: CounterMessageSetter
}

const CLOSE_TO_LIMIT = 10
const defaultMinLengthMessage: CounterMessageSetter = (
  minLength,
  currLength,
  isError
) => {
  if (isError) {
    return `${minLength} characters required, current count is ${currLength}`
  }

  return `${currLength} characters entered`
}

const defaultMaxLengthMessage: CounterMessageSetter = (
  maxLength,
  currLength,
  isError
) => {
  if (isError) {
    return `${currLength - maxLength} over the limit`
  }

  return `${maxLength - currLength} characters left`
}

const getInitialCounterMessage = ({
  minLength,
  maxLength,
  minLengthMessage,
  maxLengthMessage
}: Props) => {
  if (minLength) {
    return minLengthMessage
      ? minLengthMessage(minLength, 0, true)
      : defaultMinLengthMessage(minLength, 0, true)
  }

  if (maxLength) {
    return maxLengthMessage
      ? maxLengthMessage(maxLength, 0, false)
      : defaultMaxLengthMessage(maxLength, 0, false)
  }

  return ''
}

const useCounter = ({
  minLength,
  maxLength,
  minLengthMessage,
  maxLengthMessage
}: Props) => {
  const [message, setMesssage] = useState(() =>
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
      if (minLength) {
        const getMessage = minLengthMessage || defaultMinLengthMessage

        if (currLength < minLength) {
          setMesssage(getMessage(minLength, currLength, true))
          setIsError(true)

          return
        } else if (!maxLength) {
          setMesssage(getMessage(minLength, currLength, false))
          setIsError(false)

          return
        }
      }

      if (maxLength) {
        const getMessage = maxLengthMessage || defaultMaxLengthMessage

        if (
          maxLength - currLength <= CLOSE_TO_LIMIT &&
          maxLength - currLength >= 0
        ) {
          setMesssage(getMessage(maxLength, currLength, false))
          setIsError(true)

          return
        }

        if (currLength < maxLength) {
          setMesssage(getMessage(maxLength, currLength, false))
          setIsError(false)

          return
        }

        setMesssage(getMessage(maxLength, currLength, true))
        setIsError(true)
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
