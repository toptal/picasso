import Quill from 'quill'
import Delta from 'quill-delta'
import { useEffect } from 'react'

type Props = {
  quill?: Quill
  minLength?: number
  maxLength?: number
  getMinLengthMessage?: (minLength: number, currLength: number) => string
  getMaxLengthMessage?: (maxLength: number, currLength: number) => string
  counterMessageHandler: React.Dispatch<React.SetStateAction<string>>
}

const getMessageForMinLength = (
  minLength: number,
  currLength: number,
  getMinLengthMessage?: (minLength: number, currLength: number) => string
) => {
  if (getMinLengthMessage) {
    return getMinLengthMessage(minLength, currLength)
  }

  return `${minLength} characters required, current count is ${
    minLength - currLength
  }`
}

const getMessageForMaxLength = (
  maxLength: number,
  currLength: number,
  getMaxLengthMessage?: (maxLength: number, currLength: number) => string
) => {
  if (getMaxLengthMessage) {
    return getMaxLengthMessage(maxLength, currLength)
  }

  return `${maxLength - currLength} characters left`
}

const maxLengthReached = (quill: Quill, delta: Delta, oldContents: Delta) => {
  const selection = quill.getSelection()

  quill.setContents(oldContents)

  if (selection) {
    let index = selection.index - 1

    if (delta.ops[delta.ops.length - 1].insert === '\n') {
      index = selection.index
    }

    setTimeout(() => quill.setSelection(index, 0), 0)
  }
}

const useMinMaxLength = ({
  quill,
  minLength,
  maxLength,
  getMinLengthMessage,
  getMaxLengthMessage,
  counterMessageHandler
}: Props) => {
  useEffect(() => {
    if (minLength) {
      counterMessageHandler(
        getMessageForMinLength(minLength, 0, getMinLengthMessage)
      )
    } else if (maxLength) {
      counterMessageHandler(
        getMessageForMaxLength(maxLength, 0, getMaxLengthMessage)
      )
    } else {
      counterMessageHandler('')
    }
  }, [minLength, maxLength, getMinLengthMessage, getMaxLengthMessage])

  useEffect(() => {
    if (!quill) {
      return
    }

    const handler = (delta: Delta, oldContents: Delta) => {
      const currLength = quill.getLength()

      if (minLength && currLength <= minLength) {
        counterMessageHandler(
          getMessageForMinLength(minLength, currLength, getMinLengthMessage)
        )
      }

      if (maxLength && currLength <= maxLength) {
        if (!minLength || (minLength && minLength < currLength)) {
          counterMessageHandler(
            getMessageForMaxLength(maxLength, currLength, getMaxLengthMessage)
          )
        }
      } else if (maxLength && currLength > maxLength) {
        maxLengthReached(quill, delta, oldContents)
      }
    }

    quill.on('text-change', handler)

    return () => {
      quill.off('text-change', handler)
    }
  }, [quill, counterMessageHandler])
}

export default useMinMaxLength
