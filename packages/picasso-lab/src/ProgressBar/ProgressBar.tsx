import React, { forwardRef } from 'react'
import cx from 'classnames'
import { BaseProps } from '@toptal/picasso-shared'
import { Typography, Container } from '@toptal/picasso'
import { makeStyles, Theme } from '@material-ui/core/styles'

import styles from './styles'

const MIN_VALUE = 0
const MAX_VALUE = 100

export interface Props extends BaseProps {
  /** Percentage of completed progress */
  value: number
  /** Whether to show percentage value */
  showPercentage?: boolean
}

const useStyles = makeStyles<Theme, Props>(styles, {
  name: 'PicassoProgressBar'
})

const normalizeValue = (value: number) =>
  Math.min(Math.max(value, MIN_VALUE), MAX_VALUE)

export const ProgressBar = forwardRef<HTMLDivElement, Props>(
  function ProgressBar (props, ref) {
    const { value, showPercentage, ...restProps } = props
    const classes = useStyles(props)

    const percentage = normalizeValue(value)

    return (
      <Container
        flex
        direction='row'
        alignItems='center'
        {...restProps}
        ref={ref}
      >
        <div className={cx(classes.progressBar)}>
          <div className={cx(classes.progressIndicator)} />
        </div>

        {showPercentage && (
          <Typography
            variant='body'
            size='small'
            weight='semibold'
            className={cx(classes.percentageValue)}
          >
            {percentage}%
          </Typography>
        )}
      </Container>
    )
  }
)

ProgressBar.defaultProps = {
  showPercentage: false
}

export default ProgressBar
