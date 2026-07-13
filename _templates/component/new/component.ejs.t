---
to: packages/<%= package %>/src/<%= h.changeCase.pascalCase(name) %>/<%= h.changeCase.pascalCase(name) %>.tsx
---
<%
  Name = h.changeCase.pascalCase(name)
-%>
import type { ReactNode } from 'react'
import React, { forwardRef } from 'react'
import type { BaseProps } from '@toptal/picasso-shared'
import { twMerge } from '@toptal/picasso-tailwind-merge'

import { createRootClassNames } from './styles'

export interface Props extends BaseProps {
  /** Content of the component */
  children?: ReactNode
}

export const <%= Name %> = forwardRef<HTMLDivElement, Props>(
  function <%= Name %>(props, ref) {
    const { className, style, children, ...rest } = props

    return (
      <div
        {...rest}
        ref={ref}
        className={twMerge(...createRootClassNames(), className)}
        style={style}
      >
        {children}
      </div>
    )
  }
)

<%= Name %>.displayName = '<%= Name %>'

export default <%= Name %>
