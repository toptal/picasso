import React from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import { StandardProps } from '../Picasso'
import styles from './styles'
interface Props extends StandardProps {
  size?: number
  color?: string
}

const SvgEducation = (props: Props) => {
  const { classes, className, style, size, color } = props
  const svgStyle = {
    fontSize: size && `${size}rem`,
    ...style
  }

  return (
    <svg
      {...props}
      viewBox='0 0 24 24'
      className={cx(classes.root, className)}
      style={svgStyle}
      color={color}
    >
      <g fillRule='nonzero'>
        <path d='M12.016 12.7l8.879-4.975-8.879-4.983-8.909 4.983 8.91 4.975zm-.152.631l-9.55-5.333a.312.312 0 0 1 0-.546l9.55-5.341a.313.313 0 0 1 .306 0l9.516 5.341a.313.313 0 0 1 0 .546L12.17 13.33a.312.312 0 0 1-.305 0zM20.387 15.333c0 .173-.167.313-.375.313-.207 0-.375-.14-.375-.313v-3.258c0-.173.168-.313.375-.313.208 0 .375.14.375.313v3.258zM4.33 15.15l7.846 4.343a.313.313 0 0 1-.302.547l-8.009-4.433a.313.313 0 0 1-.16-.274v-3.258a.312.312 0 1 1 .624 0v3.074z' />
        <path d='M11.862 7.905a.313.313 0 1 1 .31-.543l4.858 2.775c.097.056.157.16.157.271v7.917a.312.312 0 1 1-.625 0V10.59l-4.7-2.685z' />
        <path d='M16.596 18.183a.312.312 0 0 1 .558 0l1.675 3.292a.313.313 0 0 1-.279.454H15.2a.313.313 0 0 1-.279-.454l1.675-3.292zm-.886 3.121h2.33l-1.165-2.29-1.165 2.29z' />
      </g>
    </svg>
  )
}

SvgEducation.displayName = 'SvgEducation'
export default withStyles(styles)(SvgEducation)
