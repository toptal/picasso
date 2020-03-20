import React, { ReactNode, ReactElement } from 'react'
import { BaseProps } from '@toptal/picasso-shared'
import { Ellipsis } from '@toptal/picasso-lab'
import { Tooltip } from '@toptal/picasso'

export interface Props extends BaseProps {
  /** A typography which can possibly overflow */
  children: ReactNode
}

export const TypographyOverflow = ({ children }: Props) => {
  const typography = React.Children.only(children) as ReactElement

  return (
    <Ellipsis
      renderWhenEllipsis={child => (
        <Tooltip content={typography.props.children} placement='top'>
          {child}
        </Tooltip>
      )}
    >
      {children}
    </Ellipsis>
  )
}

TypographyOverflow.displayName = 'TypographyOverflow'

TypographyOverflow.defaultProps = {}

export default TypographyOverflow
