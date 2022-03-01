import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import MUIStep, { StepProps } from '@material-ui/core/Step'

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
