import { toHtml } from 'hast-util-to-html'
import { useEffect, useState } from 'react'

import { ASTType } from '../../types'

const useHTMLString = (ast?: ASTType) => {
  const [html, setHtml] = useState<string | undefined>()

  useEffect(() => {
    if (ast) {
      setHtml(toHtml(ast))
    }
    /* eslint-disable react-hooks/exhaustive-deps */
    // this effects needs to happen only once on first render
  }, [])

  return html
}

export default useHTMLString
