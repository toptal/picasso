import { toHtml } from 'hast-util-to-html'
import { useEffect, useRef, useState } from 'react'

import { ASTType } from '../../types'

type Props = { defaultValue?: ASTType }

const useDefaultValue = ({ defaultValue }: Props) => {
  const isFirstRender = useRef<boolean>(true)
  const [html, setHtml] = useState<string>('')

  useEffect(() => {
    if (defaultValue && isFirstRender.current) {
      setHtml(toHtml(defaultValue))
      isFirstRender.current = false
    }
  }, [defaultValue])

  return { defaultValueInHtml: html }
}

export default useDefaultValue
