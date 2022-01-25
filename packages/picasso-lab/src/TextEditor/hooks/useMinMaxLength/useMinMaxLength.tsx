import { useMemo, useState } from 'react'
import Delta from 'quill-delta'

import { EditorRefType } from '../../types'
import useTextChange from '../useTextChange'

type Props = {
  ref: EditorRefType
  maxlength?: number
  minlength?: number
  messageForMinLength?: string
  messageForMaxLength?: string
}

const getMessageForMinLength = (minlength: number, currlength: number) => {
  return `${minlength} characters required, current count is ${
    minlength - currlength
  }`
}

const getMessageForMaxLength = (maxlength: number, currlength: number) => {
  return `${maxlength - currlength} characters left`
}

const getMinMaxHandler = (
  {
    ref,
    minlength,
    maxlength,
    messageForMinLength,
    messageForMaxLength
  }: Props,
  setMessage: any
) => (_delta: any, oldContents: Delta) => {
  const quill = ref.current! // useTextEditor already checks it for us
  const currlength = quill.getText().trim().length

  if (minlength && maxlength) {
    if (currlength < minlength) {
      setMessage(
        messageForMinLength || getMessageForMinLength(minlength, currlength)
      )
    } else if (currlength <= maxlength) {
      setMessage(
        messageForMaxLength || getMessageForMaxLength(maxlength, currlength)
      )
    } else {
      quill.setContents(oldContents)
    }
  } else if (minlength) {
    if (currlength <= minlength) {
      setMessage(
        messageForMinLength || getMessageForMinLength(minlength, currlength)
      )
    }
  } else if (maxlength) {
    if (currlength <= maxlength) {
      setMessage(
        messageForMaxLength || getMessageForMaxLength(maxlength, currlength)
      )
    } else {
      quill.setContents(oldContents)
    }
  }
}

const useMinMaxLength = (props: Props) => {
  const {
    ref,
    maxlength,
    minlength,
    messageForMinLength,
    messageForMaxLength
  } = props

  const [message, setMessage] = useState(
    (minlength && getMessageForMinLength(minlength, 0)) ||
      (maxlength && getMessageForMaxLength(maxlength, 0))
  )

  useTextChange({
    ref,
    handler: useMemo(() => getMinMaxHandler(props, setMessage), [
      ref,
      minlength,
      maxlength,
      messageForMinLength,
      messageForMaxLength
    ])
  })

  return { message }
}

export default useMinMaxLength
