import { useMemo, useState } from 'react'
import Delta from 'quill-delta'
import Quill from 'quill'

import { EditorRefType } from '../../types'
import useTextChange from '../useTextChange'
import { Props as TextEditorProps } from '../../TextEditor'

type Props = {
  ref: EditorRefType
  minLength?: TextEditorProps['minLength']
  maxLength?: TextEditorProps['maxLength']
  getMinLengthMessage?: TextEditorProps['getMinLengthMessage']
  getMaxLengthMessage?: TextEditorProps['getMaxLengthMessage']
}

const getMessageForMinLength = (
  minLength: number,
  currLength: number,
  getMinLengthMessage: Props['getMinLengthMessage']
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
  getMaxLengthMessage: Props['getMaxLengthMessage']
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

const getMinMaxHandler = (
  {
    ref,
    minLength,
    maxLength,
    getMinLengthMessage,
    getMaxLengthMessage
  }: Props,
  setMessage: React.Dispatch<React.SetStateAction<string>>
) => (delta: Delta, oldContents: Delta) => {
  const quill = ref.current! // useTextEditor already validates for us

  const currLength = quill.getLength()

  if (minLength && currLength <= minLength) {
    setMessage(
      getMessageForMinLength(minLength, currLength, getMinLengthMessage)
    )
  }

  if (maxLength && currLength <= maxLength) {
    if (!minLength || (minLength && minLength < currLength)) {
      setMessage(
        getMessageForMaxLength(maxLength, currLength, getMaxLengthMessage)
      )
    }
  } else if (maxLength && currLength > maxLength) {
    maxLengthReached(quill, delta, oldContents)
  }
}

const useMinMaxLength = (props: Props) => {
  const {
    ref,
    maxLength,
    minLength,
    getMinLengthMessage,
    getMaxLengthMessage
  } = props

  const [message, setMessage] = useState(
    (minLength && getMessageForMinLength(minLength, 0, getMinLengthMessage)) ||
      (maxLength &&
        getMessageForMaxLength(maxLength, 0, getMaxLengthMessage)) ||
      ''
  )

  useTextChange({
    ref,
    handler: useMemo(() => getMinMaxHandler(props, setMessage), [
      ref,
      minLength,
      maxLength,
      getMinLengthMessage,
      getMaxLengthMessage
    ])
  })

  return { message }
}

export default useMinMaxLength
