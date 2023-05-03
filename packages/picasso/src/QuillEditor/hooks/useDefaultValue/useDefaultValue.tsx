import type Quill from 'quill'
import { useEffect, useRef } from 'react'

type Props = {
  quill?: Quill
  defaultValue?: string
}

const useDefaultValue = ({ defaultValue, quill }: Props) => {
  const hasBeenCalled = useRef(false)

  useEffect(() => {
    if (!defaultValue || !quill || hasBeenCalled.current) {
      return
    }
    const delta = quill.clipboard.convert(defaultValue)

    quill.setContents(delta, 'api')
    hasBeenCalled.current = true
  }, [defaultValue, quill])
}

export default useDefaultValue
