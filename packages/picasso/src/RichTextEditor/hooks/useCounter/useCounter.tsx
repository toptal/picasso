import { useCallback, useState } from 'react'

import { TextLengthChangeHandler } from '../../../QuillEditor'
import { CounterMessageSetter } from '../../types'

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
  minLengthMessage = defaultMinLengthMessage,
  maxLengthMessage = defaultMaxLengthMessage
}: Props) => {
  if (minLength) {
    return minLengthMessage(minLength, 0, true)
  }

  if (maxLength) {
    return maxLengthMessage(maxLength, 0, false)
  }

  return ''
}

const useCounter = ({
  minLength,
  maxLength,
  minLengthMessage = defaultMinLengthMessage,
  maxLengthMessage = defaultMaxLengthMessage
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
        if (currLength < minLength) {
          setMesssage(minLengthMessage(minLength, currLength, true))
          setIsError(true)

          return
        } else if (!maxLength) {
          setMesssage(minLengthMessage(minLength, currLength, false))
          setIsError(false)

          return
        }
      }

      if (maxLength) {
        if (
          maxLength - currLength <= CLOSE_TO_LIMIT &&
          maxLength - currLength >= 0
        ) {
          setMesssage(maxLengthMessage(maxLength, currLength, false))
          setIsError(true)

          return
        }

        if (currLength < maxLength) {
          setMesssage(maxLengthMessage(maxLength, currLength, false))
          setIsError(false)

          return
        }

        setMesssage(maxLengthMessage(maxLength, currLength, true))
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
