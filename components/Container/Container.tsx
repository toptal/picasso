import React from 'react'

interface Props {
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
  /** Extra css classes to be passed to `Container` */
  className?: string
  /** Extra inline styling passed to a component */
  style?: object
}

export const Container: React.FunctionComponent<Props> = props => {
  const { children, className, top, bottom, left, right, inline, style } = props

  return (
    <div
      className={className}
      style={{
        marginTop: top + 'em',
        marginBottom: bottom + 'em',
        marginLeft: left + 'em',
        marginRight: right + 'em',
        display: inline ? 'inline-block' : undefined,
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
