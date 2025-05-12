import type { ReactNode, HTMLAttributes } from 'react'
import React, { forwardRef } from 'react'
import type { BaseProps } from '@toptal/picasso-shared'
import { twJoin, twMerge } from '@toptal/picasso-tailwind-merge'

import { usePageContext, useSidebar } from '../Page/Page'
import { getMaxWidthClass } from './styles'

export interface Props extends BaseProps, HTMLAttributes<HTMLDivElement> {
  /** Custom components that render content of page */
  children: ReactNode
  /** Use flexbox */
  flex?: boolean
}

export const PageContent = forwardRef<HTMLDivElement, Props>(
  function PageContent(props, ref) {
    const { children, className, style, flex, ...rest } = props

    const { width, fullWidth } = usePageContext()
    const { hasSidebar } = useSidebar()

    const innerClassName = twJoin(
      'h-full grow bg-[#fcfcfc] bg-clip-content',
      getMaxWidthClass({ fullWidth, width }),
      flex && 'flex'
    )

    return (
      <div
        {...rest}
        ref={ref}
        className={twMerge(
          'flex flex-[1] w-full justify-center',
          hasSidebar &&
            'bg-[linear-gradient(90deg,rgb(243,244,246)50%,rgb(252,252,252)50%)]',
          className
        )}
        style={style}
      >
        <div className={innerClassName}>{children}</div>
      </div>
    )
  }
)

PageContent.defaultProps = {
  flex: true,
}

PageContent.displayName = 'PageContent'

export default PageContent
