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
    ref,
    style: {
      ...typography.props.style,
      /**
       * Workaround for `text-overflow:ellipsis`.
       * Browser can show ellipsis at the end, even if it's not required -
       * it's possible if the text has the very same width as the container
       * (ellipsis width will be the same as the width of the text hidden by these ellipsis).
       * It could be also affected by the font itself, when it has wider render bouncing borders.
       * So to be sure, that text container in slightly wider than parent,
       * we have to to add some super-minor space at the end.
       * Working in pair with a `fontRenderSpace` at useEllipsis hook.
       */
      paddingRight: '0.9px'
    }
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
