import { useEffect, useState } from 'react'
import { TextChangeHandler } from 'quill'

import { EditorRefType } from '../../types'

const useMinMaxLength = ({
  ref,
  maxlength,
  minlength
}: {
  ref: EditorRefType
  maxlength?: number
  minlength?: number
}) => {
  const [message, setMessage] = useState(
    (minlength && minCharsLeft(minlength, 0)) ||
      (maxlength && maxCharsLeft(maxlength, 0))
  )

  /* eslint-disable func-style */
  function minCharsLeft(minlength: number, currlength: number) {
    return `${minlength} characters required, current count is ${
      minlength - currlength
    }`
  }

  /* eslint-disable func-style */
  function maxCharsLeft(maxlength: number, currlength: number) {
    return `${maxlength - currlength} characters left`
  }

  useEffect(() => {
    const quill = ref.current

    if (quill) {
      const minMaxHandler: TextChangeHandler = (_delta, oldContents) => {
        const currlength = quill.getText().trim().length

        if (minlength && maxlength) {
          if (currlength < minlength) {
            setMessage(minCharsLeft(minlength, currlength))
          } else if (currlength <= maxlength) {
            setMessage(maxCharsLeft(maxlength, currlength))
          } else {
            quill.setContents(oldContents)
          }
        } else if (minlength) {
          if (currlength <= minlength) {
            setMessage(minCharsLeft(minlength, currlength))
          }
        } else if (maxlength) {
          if (currlength <= maxlength) {
            setMessage(maxCharsLeft(maxlength, currlength))
          } else {
            quill.setContents(oldContents)
          }
        }
      }

      quill.on('text-change', minMaxHandler)

      return () => {
        quill.off('text-change', minMaxHandler)
      }
    }
  }, [ref, maxlength, minlength])

  return { message }
}

export default useMinMaxLength
