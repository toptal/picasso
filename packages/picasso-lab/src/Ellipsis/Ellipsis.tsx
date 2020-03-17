import React, { ReactNode, ReactElement } from 'react'
import { BaseProps } from '@toptal/picasso-shared'

import useEllipsis from './use-ellipsis'

export interface Props extends BaseProps {
  /** Content of Ellipsis */
  children: ReactNode
  /** Specifies what to render in case of ellipsis active */
  renderWhenEllipsis: (children: ReactNode) => ReactNode
}

const identity: <T>(arg: T) => T = input => input

export const Ellipsis = ({
  children,
  renderWhenEllipsis = identity
}: Props) => {
  let typography = React.Children.only(children)
  const { ref, isEllipsis } = useEllipsis()
  typography = React.cloneElement(typography as ReactElement, {
    ref
  })

  // eslint-disable-next-line react/jsx-props-no-spreading
  return isEllipsis ? renderWhenEllipsis(typography) : typography
}

Ellipsis.displayName = 'Ellipsis'

Ellipsis.defaultProps = {
  renderWhenEllipsis: identity
}

export default Ellipsis
