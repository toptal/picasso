import type { ReactNode, HTMLAttributes } from 'react'
import React, { useContext, forwardRef } from 'react'
import type { BaseProps } from '@toptal/picasso-shared'
import { useSidebar } from '@toptal/picasso-provider'
import { twJoin, twMerge } from '@toptal/picasso-tailwind-merge'

import { PageContext } from '../Page'
import type { PageContextProps } from '../Page/types'
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

    const { width, fullWidth } = useContext<PageContextProps>(PageContext)
    const { hasSidebar } = useSidebar()

    const innerClassName = twJoin(
      'h-full  grow-1 bg-[#fcfcfc] bg-clip-content',
      getMaxWidthClass({ fullWidth, width }),
      flex && 'flex'
    )

    return (
      <div
        {...rest}
        ref={ref}
        className={twMerge(
          'flex flex-[1] w-full justify-center',
          hasSidebar && 'bg-gradient-to-r from-[#f3f4f6] to-[#fcfcfc]',
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
