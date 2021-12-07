import Quill from 'quill'
import Delta from 'quill-delta'
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

    // there is issue in default types
    const delta = (quill.clipboard.convert as (html: string) => Delta)(
      defaultValue
    )

    quill.setContents(delta, 'silent')
    hasBeenCalled.current = true
  }, [defaultValue, quill])
}

export default useDefaultValue
