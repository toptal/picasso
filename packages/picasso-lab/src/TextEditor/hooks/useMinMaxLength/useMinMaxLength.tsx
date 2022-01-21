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
  const [numOfCharsLeft, setNumOfCharsLeft] = useState<number | undefined>(
    minlength || maxlength
  )

  useEffect(() => {
    const quill = ref.current

    if (quill) {
      const minMaxHandler: TextChangeHandler = (_delta, oldContents) => {
        const currlength = quill.getText().trim().length

        if (minlength && maxlength) {
          if (currlength < minlength) {
            setNumOfCharsLeft(minlength - currlength)
          } else if (currlength <= maxlength) {
            setNumOfCharsLeft(maxlength - currlength)
          } else {
            quill.setContents(oldContents)
          }
        } else if (minlength) {
          if (currlength <= minlength) {
            setNumOfCharsLeft(minlength - currlength)
          } else if (maxlength) {
            if (currlength <= maxlength) {
              setNumOfCharsLeft(maxlength - currlength)
            } else {
              quill.setContents(oldContents)
            }
          }
        }
      }

      quill.on('text-change', minMaxHandler)

      return () => {
        quill.off('text-change', minMaxHandler)
      }
    }
  }, [ref, maxlength, minlength])

  return [numOfCharsLeft]
}

export default useMinMaxLength
