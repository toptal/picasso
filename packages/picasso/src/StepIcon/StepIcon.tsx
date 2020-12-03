import React, { FunctionComponent, HTMLAttributes } from 'react'
import cx from 'classnames'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { mergeClasses, StandardProps } from '@toptal/picasso-shared'

import { CheckMinor24 as TickIcon } from '../Icon'
import styles from './styles'

export interface Props extends StandardProps, HTMLAttributes<HTMLDivElement> {
  active?: boolean
  completed?: boolean
}

const useStyles = makeStyles<Theme, Props>(styles, { name: 'PicassoStepIcon' })

export const StepIcon: FunctionComponent<Props> = props => {
  const { active, completed, classes: externalClasses, ...rest } = props
  const classes = mergeClasses(useStyles(props), externalClasses)

  return (
    <div
      // eslint-disable-next-line react/jsx-props-no-spreading
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
