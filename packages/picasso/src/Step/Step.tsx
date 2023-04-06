import React from 'react'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import type { StepProps } from '@material-ui/core'
import { Step as MUIStep } from '@material-ui/core'

import styles from './styles'

export type Props = StepProps

const useStyles = makeStyles<Theme>(styles, { name: 'PicassoStep' })

export const Step = (props: Props) => {
  const { active, children, completed, ...rest } = props
  const classes = useStyles()

  return (
    <MUIStep {...rest} active={active} completed={completed} classes={classes}>
      {children}
    </MUIStep>
  )
}

Step.displayName = 'Step'

export default Step
