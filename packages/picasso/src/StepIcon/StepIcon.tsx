import React, { HTMLAttributes } from 'react'
import cx from 'classnames'
import { Theme } from '@mui/material/styles'
import makeStyles from '@mui/styles/makeStyles'
import { BaseProps } from '@toptal/picasso-shared'

import { CheckSolid24 as TickIcon } from '../Icon'
import styles from './styles'

export interface Props extends BaseProps, HTMLAttributes<HTMLDivElement> {
  active?: boolean
  completed?: boolean
}

const useStyles = makeStyles<Theme>(styles, { name: 'PicassoStepIcon' })

export const StepIcon = (props: Props) => {
  const { active, completed, ...rest } = props
  const classes = useStyles()

  return (
    <div
      {...rest}
      className={cx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed
      })}
    >
      {completed && <TickIcon />}
    </div>
  )
}

StepIcon.displayName = 'StepIcon'

export default StepIcon
