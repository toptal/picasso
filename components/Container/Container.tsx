import React from 'react'

interface Props {
  top?: number
  bottom?: number
  left?: number
  right?: number
  inline?: boolean
  className?: string
  style?: object
}

const Container: React.FunctionComponent<Props> = props => {
  const { children, className, top, bottom, left, right, inline, style } = props

  return (
    <div
      className={className}
      style={{
        marginTop: top + 'em',
        marginBottom: bottom + 'em',
        marginLeft: left + 'em',
        marginRight: right + 'em',
        display: inline ? ('inline-block' as 'inline-block') : undefined,
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
