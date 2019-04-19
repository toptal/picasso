import React from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import { StandardProps } from '../Picasso'
import styles from './styles'
interface Props extends StandardProps {
  width?: number
  height?: number
}

const SvgSkills = (props: Props) => {
  const { classes, className, style, width, height } = props

  return (
    <svg
      {...props}
      viewBox='0 0 24 24'
      className={cx(classes.root, className)}
      style={style}
      height={height}
      width={width}
    >
      <g fillRule='nonzero'>
        <path d='M17.862 14.837a.313.313 0 0 1 .443-.441l4.525 4.533a.313.313 0 0 1 0 .442l-3.459 3.458a.313.313 0 0 1-.442 0l-4.533-4.524a.313.313 0 1 1 .441-.443l4.313 4.305 3.017-3.017-4.305-4.313zM3.5 6.517l4.305 4.312a.313.313 0 0 1-.443.442L2.837 6.737a.313.313 0 0 1 0-.441l3.459-3.459a.313.313 0 0 1 .441 0l4.534 4.525a.312.312 0 1 1-.442.443L6.517 3.5 3.5 6.517z' />
        <path d='M5.954 9.421a.313.313 0 0 1-.442-.442l1.734-1.733a.313.313 0 0 1 .442.442L5.954 9.42zM7.804 11.271a.313.313 0 0 1-.442-.442l.867-.867a.313.313 0 0 1 .442.442l-.867.867zM16.687 20.147a.313.313 0 0 1-.44-.444l1.733-1.725a.313.313 0 0 1 .44.444l-1.733 1.725zM14.838 18.304a.313.313 0 0 1-.442-.442l.866-.866a.313.313 0 0 1 .442.442l-.866.866zM4.412 17.483c0-.083.033-.162.092-.22L17.262 4.503a.312.312 0 0 1 .442 0l3.459 3.458a.312.312 0 0 1 0 .442L8.404 21.163a.312.312 0 0 1-.22.091H4.724a.312.312 0 0 1-.313-.312v-3.459zm.625.13v3.016h3.017L20.5 8.183l-3.017-3.016L5.037 17.613z' />
        <path d='M6.671 19.43a.313.313 0 0 1-.442-.443L17.321 7.896a.312.312 0 1 1 .442.442L6.67 19.429z' />
      </g>
    </svg>
  )
}

SvgSkills.displayName = 'SvgSkills'
export default withStyles(styles)(SvgSkills)
