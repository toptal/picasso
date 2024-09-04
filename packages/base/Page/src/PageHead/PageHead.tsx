import type { ReactNode } from 'react'
import React, { forwardRef } from 'react'
import type { TextLabelProps, BaseProps } from '@toptal/picasso-shared'
import { Container } from '@toptal/picasso-container'
import { Typography } from '@toptal/picasso-typography'
import { twMerge } from '@toptal/picasso-tailwind-merge'

export interface Props extends BaseProps {
  /** Content */
  children?: ReactNode
  /** Whether it should have right padding */
  rightPadding?: boolean
  /** Whether it should hide bottom border */
  noBorder?: boolean
}

const Title = ({
  titleCase,
  children,
  className,
  ...rest
}: TextLabelProps & { children: ReactNode } & BaseProps) => {
  return (
    <Typography
      variant='heading'
      size='large'
      titleCase={titleCase}
      className={className}
      {...rest}
    >
      {children}
    </Typography>
  )
}

const Tabs = ({
  children,
  className,
  ...rest
}: { children: ReactNode } & BaseProps) => {
  return (
    <Container className={className} {...rest}>
      {children}
    </Container>
  )
}

const Main = (
  props: { children?: ReactNode; enableMinHeight?: boolean } & BaseProps
) => {
  const { className, children, enableMinHeight, ...rest } = props

  return (
    <Container
      flex
      justifyContent='space-between'
      alignItems='center'
      className={twMerge(
        enableMinHeight ? 'py-3 min-h-[3.375em]' : 'h-[3.375em]',
        className
      )}
      {...rest}
    >
      {children}
    </Container>
  )
}

const Actions = ({
  children,
  className,
  ...rest
}: { children: ReactNode } & BaseProps) => {
  return (
    <Container flex alignItems='center' className={className} {...rest}>
      {children}
    </Container>
  )
}

const borderPseudoElement = [
  'after:content-[""]',
  'after:absolute',
  'after:inset-x-0',
  'after:bottom-0',
  'after:z-0',
  'after:bg-gray-200',
]

export const PageHead = forwardRef<HTMLDivElement, Props>(function PageHead(
  props,
  ref
) {
  const { children, noBorder, rightPadding, className } = props
  const withBorder = !noBorder

  return (
    <Container
      ref={ref}
      className={twMerge(
        'relative',
        withBorder && borderPseudoElement,
        rightPadding && 'pr-8',
        className
      )}
    >
      {children}
    </Container>
  )
})

PageHead.defaultProps = {
  rightPadding: false,
  noBorder: false,
}

PageHead.displayName = 'PageHead'

export default Object.assign(PageHead, {
  Title,
  Tabs,
  Main,
  Actions,
})
