import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import CodeBlock16 from './CodeBlock16'
import CodeBlock24 from './CodeBlock24'
import type { Props } from './CodeBlock16'

const CodeBlockResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <CodeBlock16 {...props} />,
    },
    <CodeBlock24 {...props} />
  ) as JSX.Element
}

export default CodeBlockResponsive
