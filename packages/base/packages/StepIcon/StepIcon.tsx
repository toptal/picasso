/* eslint-disable import/no-extraneous-dependencies */
import type { HTMLAttributes } from 'react'
import React from 'react'
import cx from 'classnames'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import type { BaseProps } from '@toptal/picasso-shared'
import { CheckSolid24 as TickIcon } from '@toptal/picasso-icon'

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
        [classes.completed]: completed,
      })}
    >
      {completed && <TickIcon />}
    </div>
  )
}

StepIcon.displayName = 'StepIcon'

export default StepIcon
