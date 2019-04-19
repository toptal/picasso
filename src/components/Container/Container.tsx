import React, { ReactNode, FunctionComponent } from 'react'

import { BaseProps } from '../Picasso'

type DirectionType = 'row' | 'column'

type AlignItemsType = 'flex-start' | 'flex-end' | 'center' | 'stretch'
type JustifyContentType =
  | 'start'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'

interface Props extends BaseProps {
  /** margin for the container calculated in `em` */
  m?: number
  /** margin-top for the container calculated in `em` */
  mt?: number
  /** margin-bottom for the container calculated in `em` */
  mb?: number
  /** margin-left for the container calculated in `em` */
  ml?: number
  /** margin-right for the container calculated in `em` */
  mr?: number
  /** margin-left and margin-right shorthand for the container calculated in `em` */
  mx?: number
  /** margin-top and margin-bottom shorthand for the container calculated in `em` */
  my?: number
  /** padding for the container calculated in `em` */
  p?: number
  /** padding-top for the container calculated in `em` */
  pt?: number
  /** padding-bottom for the container calculated in `em` */
  pb?: number
  /** padding-left for the container calculated in `em` */
  pl?: number
  /** padding-right for the container calculated in `em` */
  pr?: number
  /** padding-left and padding-right shorthand for the container calculated in `em` */
  px?: number
  /** padding-top and padding-bottom shorthand for the container calculated in `em` */
  py?: number
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

export const Container: FunctionComponent<Props> = ({
  children,
  className,
  m,
  mt,
  mb,
  ml,
  mr,
  mx,
  my,
  p,
  pt,
  pb,
  pl,
  pr,
  px,
  py,
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
    ...(m && { margin: `${m}em` }),
    ...(mx && { marginLeft: `${mx}em`, marginRight: `${mx}em` }),
    ...(my && { marginTop: `${my}em`, marginBottom: `${my}em` }),
    ...(mt && { marginTop: `${mt}em` }),
    ...(mb && { marginBottom: `${mb}em` }),
    ...(ml && { marginLeft: `${ml}em` }),
    ...(mr && { marginRight: `${mr}em` })
  }

  const paddings = {
    ...(p && { padding: `${p}em` }),
    ...(px && { paddingLeft: `${px}em`, paddingRight: `${px}em` }),
    ...(py && { paddingTop: `${py}em`, paddingBottom: `${py}em` }),
    ...(pt && { paddingTop: `${pt}em` }),
    ...(pb && { paddingBottom: `${pb}em` }),
    ...(pl && { paddingLeft: `${pl}em` }),
    ...(pr && { paddingRight: `${pr}em` })
  }

  return (
    <div
      className={className}
      style={{
        ...margins,
        ...paddings,
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
