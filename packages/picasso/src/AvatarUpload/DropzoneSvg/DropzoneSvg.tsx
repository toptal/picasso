import React from 'react'
import { makeStyles, Theme } from '@material-ui/core'
import { BaseProps } from '@toptal/picasso-shared'

import styles from './styles'
import { getBackgroundShape, getBordersShape, getOutlineShape } from './utils'

const BASE_FONT_SIZE = 16

const dimensions = 5 * BASE_FONT_SIZE
const cornerSize = BASE_FONT_SIZE

const backgroundShape = getBackgroundShape(dimensions, cornerSize)
const bordersShape = getBordersShape(dimensions, cornerSize)
const outlineShape = getOutlineShape(dimensions, cornerSize)

export interface Props extends BaseProps {}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoDropzoneSvg',
})

export const DropzoneSvg = (props: Props) => {
  const { 'data-testid': dataTestId } = props

  const classes = useStyles()

  return (
    <div className={classes.root} data-testid={dataTestId}>
      <svg
        className={classes.svg}
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          className={classes.background}
          fillRule='evenodd'
          clipRule='evenodd'
          d={backgroundShape}
        />
        <path
          className={classes.outline}
          fillRule='evenodd'
          clipRule='evenodd'
          d={outlineShape}
          strokeOpacity='.48'
          strokeWidth='3'
          strokeLinejoin='round'
        />
        <path
          className={classes.border}
          fillRule='evenodd'
          clipRule='evenodd'
          d={bordersShape}
          strokeDasharray='3 3'
        />
      </svg>
    </div>
  )
}

DropzoneSvg.displayName = 'DropzoneSvg'

DropzoneSvg.defaultProps = {
  size: 'small',
}

export default DropzoneSvg
