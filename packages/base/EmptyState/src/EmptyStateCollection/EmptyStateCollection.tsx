import type { HTMLAttributes, ReactElement } from 'react'
import React, { forwardRef, cloneElement } from 'react'
import { Search16 as Search } from '@toptal/picasso-icons'
import { Container } from '@toptal/picasso-container'
import { Typography } from '@toptal/picasso-typography'

export interface Props extends HTMLAttributes<HTMLDivElement> {
  /** Adds <Icon /> before EmptyStateCollection content */
  icon?: ReactElement
}

export const EmptyStateCollection = forwardRef<HTMLDivElement, Props>(
  function EmptyStateCollection(props, ref) {
    const { icon, children, style, ...rest } = props

    const iconProps = {
      className: 'basis-4 min-w-4 h-4',
      color: 'dark-grey' as const,
    }

    const iconElement = icon ? (
      cloneElement(icon, iconProps)
    ) : (
      <Search {...iconProps} />
    )

    return (
      <Container {...rest} alignItems='center' flex ref={ref} style={style}>
        <Container alignItems='center' flex right='xsmall'>
          {iconElement}
        </Container>
        <Container>
          <Typography size='xsmall'>{children}</Typography>
        </Container>
      </Container>
    )
  }
)

EmptyStateCollection.displayName = 'EmptyStateCollection'

export default EmptyStateCollection
