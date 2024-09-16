import type { ReactNode, HTMLAttributes } from 'react'
import React, { forwardRef } from 'react'
import type { BaseProps, OverridableComponent } from '@toptal/picasso-shared'
import { Container } from '@toptal/picasso-container'
import { twMerge } from '@toptal/picasso-tailwind-merge'

export interface Props extends BaseProps, HTMLAttributes<HTMLDivElement> {
  /** Custom components that render content of page */
  children: ReactNode
}

export const PageArticle: OverridableComponent<Props> = forwardRef<
  HTMLDivElement,
  Props
>(function PageArticle(props, ref) {
  const { children, className, style, ...rest } = props

  return (
    <Container
      {...rest}
      ref={ref}
      className={twMerge('flex-1 my-0 mx-4 md:mx-8', className)}
      style={style}
    >
      {children}
    </Container>
  )
})

PageArticle.defaultProps = {}

PageArticle.displayName = 'PageArticle'

export default PageArticle
