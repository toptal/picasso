import { useMemo, useState } from 'react'
import Delta from 'quill-delta'

import { EditorRefType } from '../../types'
import useTextChange from '../useTextChange'
import { Props as TextEditorProps } from '../../TextEditor'

type Props = {
  ref: EditorRefType
  minlength?: TextEditorProps['minlength']
  maxlength?: TextEditorProps['maxlength']
  getTextForMinLength?: TextEditorProps['getTextForMinLength']
  getTextForMaxLength?: TextEditorProps['getTextForMaxLength']
  typographyContainerRef?: React.RefObject<HTMLDivElement>
}

const getMessageForMinLength = (minlength: number, currlength: number) => {
  return `${minlength} characters required, current count is ${
    minlength - currlength
  }`
}

const getMessageForMaxLength = (maxlength: number, currlength: number) => {
  return `${maxlength - currlength} characters left`
}

const getTotalChars = (children: NodeList | undefined): any => {
  const htmlElements: HTMLElement[] = []

  children?.forEach(child => htmlElements.push(child as HTMLElement))

  // Quill sets empty editor to "\n".
  // https://github.com/quilljs/quill/blob/cf9d8354b7c0f7e8d1cb19d95c65a6c4f62e8210/core/quill.js#L387
  if (htmlElements.length === 1 && htmlElements[0].innerText === '\n') {
    return 0
  }

  const totalChars: number = htmlElements
    .map((elem: HTMLElement) => elem.innerText?.length)
    .reduce((prev: number, curr: number) => prev + curr, 0)

  return totalChars
}

const getMinMaxHandler = (
  {
    ref,
    minlength,
    maxlength,
    getTextForMinLength,
    getTextForMaxLength,
    typographyContainerRef
  }: Props,
  setMessage: any
) => (_delta: any, oldContents: Delta) => {
  const quill = ref.current! // useTextEditor already validates for us

  const typographyContainer = typographyContainerRef?.current

  if (typographyContainer) {
    const contents = typographyContainer.firstChild?.firstChild?.childNodes
    const currlength = getTotalChars(contents)

    if (minlength && maxlength) {
      if (currlength <= minlength) {
        setMessage(
          (getTextForMinLength && getTextForMinLength(minlength, currlength)) ||
            getMessageForMinLength(minlength, currlength)
        )
      } else if (currlength <= maxlength) {
        setMessage(
          (getTextForMaxLength && getTextForMaxLength(maxlength, currlength)) ||
            getMessageForMaxLength(maxlength, currlength)
        )
      } else {
        const selection = quill.getSelection()

        quill.setContents(oldContents, 'silent')
        if (selection) {
          setTimeout(
            () => quill.setSelection(selection.index, selection.length),
            0
          )
        }
      }
    } else if (minlength) {
      if (currlength <= minlength) {
        setMessage(
          (getTextForMinLength && getTextForMinLength(minlength, currlength)) ||
            getMessageForMinLength(minlength, currlength)
        )
      }
    } else if (maxlength) {
      if (currlength <= maxlength) {
        setMessage(
          (getTextForMaxLength && getTextForMaxLength(maxlength, currlength)) ||
            getMessageForMaxLength(maxlength, currlength)
        )
      } else {
        const selection = quill.getSelection()

        quill.setContents(oldContents, 'silent')
        if (selection) {
          setTimeout(
            () => quill.setSelection(selection.index, selection.length),
            0
          )
        }
      }
    }
  }
}

const useMinMaxLength = (props: Props) => {
  const {
    ref,
    maxlength,
    minlength,
    getTextForMinLength,
    getTextForMaxLength,
    typographyContainerRef
  } = props

  const [message, setMessage] = useState(
    (getTextForMinLength && getTextForMinLength(minlength, 0)) ||
      (minlength && getMessageForMinLength(minlength, 0)) ||
      (getTextForMaxLength && getTextForMaxLength(maxlength, 0)) ||
      (maxlength && getMessageForMaxLength(maxlength, 0))
  )

  useTextChange({
    ref,
    handler: useMemo(() => getMinMaxHandler(props, setMessage), [
      ref,
      minlength,
      maxlength,
      getTextForMinLength,
      getTextForMaxLength,
      typographyContainerRef
    ])
  })

  return { message }
}

export default useMinMaxLength
