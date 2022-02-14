import Quill from 'quill'
import Delta from 'quill-delta'
import { useEffect } from 'react'

type Props = {
  quill?: Quill
  defaultValue?: string
}

const useDefaultValue = ({ defaultValue, quill }: Props) => {
  useEffect(() => {
    if (!defaultValue || !quill) {
      return
    }

    // there is issue in default types
    const delta = (quill.clipboard.convert as (html: string) => Delta)(
      defaultValue
    )

    quill.setContents(delta, 'api')
  }, [defaultValue, quill])
}

export default useDefaultValue
