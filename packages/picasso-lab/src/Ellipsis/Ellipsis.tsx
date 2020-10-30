import React, { ReactNode, ReactElement, FunctionComponent } from 'react'
import { BaseProps } from '@toptal/picasso-shared'

import useEllipsis from './use-ellipsis'

export interface Props extends BaseProps {
  /** Content of Ellipsis */
  children: ReactNode
  /** Specifies what to render in case of ellipsis active */
  renderWhenEllipsis?: (children: ReactElement) => ReactElement
}

const identity: <T>(arg: T) => T = input => input

export const Ellipsis: FunctionComponent<Props> = ({
  children,
  renderWhenEllipsis
}: Props) => {
  let typography = React.Children.only(children) as ReactElement
  const { ref, isEllipsis } = useEllipsis()

  typography = React.cloneElement(typography, {
    ref
  })

  return isEllipsis && renderWhenEllipsis
    ? renderWhenEllipsis(typography)
    : typography
}

Ellipsis.displayName = 'Ellipsis'

Ellipsis.defaultProps = {
  renderWhenEllipsis: identity
}

export default Ellipsis
