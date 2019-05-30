import React, { ReactNode, FunctionComponent } from 'react'

import { BaseProps, SpacingType, spacingToEm } from '../Picasso'

type DirectionType = 'row' | 'column'

type AlignItemsType =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'stretch'
  | 'baseline'
type JustifyContentType =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'

interface Props extends BaseProps {
  /** margin-top for the container transformed to `em` */
  top?: SpacingType
  /** margin-bottom for the container transformed to `em` */
  bottom?: SpacingType
  /** margin-left for the container transformed to `em` */
  left?: SpacingType
  /** margin-right for the container transformed to `em` */
  right?: SpacingType
  /** padding for the container transformed to `em` */
  padded?: SpacingType
  /** Whether container should act as inline element `display: inline-block` */
  inline?: boolean
  /** Use flexbox */
  flex?: boolean
  /** Set flex direction */
  direction?: DirectionType
  /** Defines the align-items style property */
  alignItems?: AlignItemsType
  /** Defines the justify-content style property */
  justifyContent?: JustifyContentType
  /** Content of Container */
  children: ReactNode
}

/**
 * Container component used for spacing 2 elements
 */
export const Container: FunctionComponent<Props> = ({
  children,
  className,
  top,
  bottom,
  left,
  right,
  padded,
  inline,
  flex,
  direction,
  alignItems,
  justifyContent,
  style
}) => {
  const display = flex ? 'flex' : 'block'
  const inlineDisplay = flex ? 'inline-flex' : 'inline-block'

  const margins = {
    ...(top && { marginTop: spacingToEm(top) }),
    ...(bottom && { marginBottom: spacingToEm(bottom) }),
    ...(left && { marginLeft: spacingToEm(left) }),
    ...(right && { marginRight: spacingToEm(right) })
  }

  return (
    <div
      className={className}
      style={{
        ...margins,
        ...(padded && { padding: spacingToEm(padded) }),
        display: inline ? inlineDisplay : display,
        ...(direction && { flexDirection: direction }),
        ...(alignItems && { alignItems: alignItems }),
        ...(justifyContent && { justifyContent: justifyContent }),
        ...style
      }}
    >
      {children}
    </div>
  )
}

Container.defaultProps = {
  inline: false
}

export default Container
