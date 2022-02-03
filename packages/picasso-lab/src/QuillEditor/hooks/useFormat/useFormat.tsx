import Quill from 'quill'
import { useEffect } from 'react'

import { FormatType } from '../../types'

type Props = {
  quill?: Quill
  format: FormatType
}

const useFormat = ({ quill, format }: Props) => {
  useEffect(() => {
    if (quill) {
      quill.format('bold', format.bold)
    }
  }, [quill, format.bold])
  useEffect(() => {
    if (quill) {
      quill.format('list', format.list)
    }
  }, [quill, format.list])
  useEffect(() => {
    if (quill) {
      quill.format('italic', format.italic)
    }
  }, [quill, format.italic])
  useEffect(() => {
    if (quill) {
      quill.format('header', format.header ? parseFloat(format.header) : false)
    }
  }, [quill, format.header])
}

export default useFormat
