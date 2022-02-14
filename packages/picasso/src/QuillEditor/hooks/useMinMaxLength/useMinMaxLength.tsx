import Quill from 'quill'
import Delta from 'quill-delta'
import { useEffect } from 'react'

type Props = {
  editorRef: React.RefObject<HTMLDivElement>
  quill?: Quill
  minLength?: number
  maxLength?: number
  counterMessageHandler: React.Dispatch<React.SetStateAction<string>>
}

const getMinLengthMessage = (minLength: number, currLength: number) =>
  `${currLength}/${minLength}`
const getMaxLengthMessage = (maxLength: number, currLength: number) =>
  `${maxLength}/${currLength}`

const getMessageForMinLength = (
  minLength: number,
  currLength: number,
  getMinLengthMessage: (minLength: number, currLength: number) => string
) => {
  return (
    (getMinLengthMessage && getMinLengthMessage(minLength, currLength)) ||
    `${minLength} characters required, current count is ${
      minLength - currLength
    }`
  )
}

const getMessageForMaxLength = (
  maxLength: number,
  currLength: number,
  getMaxLengthMessage: (maxLength: number, currLength: number) => string
) => {
  return (
    (getMaxLengthMessage && getMaxLengthMessage(maxLength, currLength)) ||
    `${maxLength - currLength} characters left`
  )
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
  editorRef,
  quill,
  minLength,
  maxLength,
  counterMessageHandler
}: Props) => {
  useEffect(() => {
    if (!editorRef.current || !quill) {
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
