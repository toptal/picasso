import { toHtml } from 'hast-util-to-html'
import { useEffect, useState } from 'react'

import { ASTType } from '../../types'

type Props = { defaultValue?: ASTType }

const useDefaultValue = ({ defaultValue }: Props) => {
  const [html, setHtml] = useState<string>('')

  useEffect(() => {
    if (defaultValue) {
      setHtml(toHtml(defaultValue))
    }
  }, [defaultValue])

  return { defaultValueInHtml: html }
}

export default useDefaultValue
