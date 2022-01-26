import { useMemo, useState } from 'react'
import Delta from 'quill-delta'
import Quill from 'quill'

import { EditorRefType } from '../../types'
import useTextChange from '../useTextChange'
import { Props as TextEditorProps } from '../../TextEditor'

type Props = {
  ref: EditorRefType
  minlength?: TextEditorProps['minlength']
  maxlength?: TextEditorProps['maxlength']
  getTextForMinLength?: TextEditorProps['getTextForMinLength']
  getTextForMaxLength?: TextEditorProps['getTextForMaxLength']
}

const getMessageForMinLength = (
  minlength: number,
  currlength: number,
  getTextForMinLength: Props['getTextForMinLength']
) => {
  return (
    (getTextForMinLength && getTextForMinLength(minlength, currlength)) ||
    `${minlength} characters required, current count is ${
      minlength - currlength
    }`
  )
}

const getMessageForMaxLength = (
  maxlength: number,
  currlength: number,
  getTextForMaxLength: Props['getTextForMaxLength']
) => {
  return (
    (getTextForMaxLength && getTextForMaxLength(maxlength, currlength)) ||
    `${maxlength - currlength} characters left`
  )
}

const handleMaxLengthReached = (
  quill: Quill,
  delta: Delta,
  oldContents: Delta
) => {
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
    minlength,
    maxlength,
    getTextForMinLength,
    getTextForMaxLength
  }: Props,
  setMessage: any
) => (delta: Delta, oldContents: Delta) => {
  const quill = ref.current! // useTextEditor already validates for us

  const currlength = quill.getLength()

  if (minlength && currlength <= minlength) {
    setMessage(
      getMessageForMinLength(minlength, currlength, getTextForMinLength)
    )
  }

  if (maxlength && currlength <= maxlength) {
    if (!minlength || (minlength && minlength < currlength)) {
      setMessage(
        getMessageForMaxLength(maxlength, currlength, getTextForMaxLength)
      )
    }
  } else if (maxlength && currlength > maxlength) {
    handleMaxLengthReached(quill, delta, oldContents)
  }
}

const useMinMaxLength = (props: Props) => {
  const {
    ref,
    maxlength,
    minlength,
    getTextForMinLength,
    getTextForMaxLength
  } = props

  const [message, setMessage] = useState(
    (minlength && getMessageForMinLength(minlength, 0, getTextForMinLength)) ||
      (maxlength && getMessageForMaxLength(maxlength, 0, getTextForMaxLength))
  )

  useTextChange({
    ref,
    handler: useMemo(() => getMinMaxHandler(props, setMessage), [
      ref,
      minlength,
      maxlength,
      getTextForMinLength,
      getTextForMaxLength
    ])
  })

  return { message }
}

export default useMinMaxLength
