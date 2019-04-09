import React, { ReactNode, FunctionComponent } from 'react'

import { BaseProps } from '../Picasso'

type DirectionType = 'row' | 'column'

type AlignItemsType = 'flex-start' | 'flex-end' | 'center' | 'stretch'

interface Props extends BaseProps {
  /** marginTop for the container calculated as `${top}em` */
  top?: number
  /** marginBottom for the container calculated as `${bottom}em` */
  bottom?: number
  /** marginLeft for the container calculated as `${left}em` */
  left?: number
  /** marginRight for the container calculated as `${right}em` */
  right?: number
  /** Whether container should act as inline element `display: inline-block` */
  inline?: boolean
  /** Use flexbox */
  flex?: boolean
  /** Set flex direction */
  direction?: DirectionType
  /** Defines the align-items style property */
  alignItems?: AlignItemsType
  /** Content of Container */
  children: ReactNode
}

export const Container: FunctionComponent<Props> = ({
  children,
  className,
  top,
  bottom,
  left,
  right,
  inline,
  flex,
  direction,
  alignItems,
  style
}) => {
  const display = flex ? 'flex' : 'block'
  const inlineDisplay = flex ? 'inline-flex' : 'inline-block'

  return (
    <div
      className={className}
      style={{
        marginTop: top + 'em',
        marginBottom: bottom + 'em',
        marginLeft: left + 'em',
        marginRight: right + 'em',
        display: inline ? inlineDisplay : display,
        ...(direction && { flexDirection: direction }),
        ...(alignItems && { alignItems: alignItems }),
        ...style
      }}
    >
      {children}
    </div>
  )
}

Container.defaultProps = {
  bottom: 0,
  inline: false,
  left: 0,
  right: 0,
  top: 0
}

export default Container
