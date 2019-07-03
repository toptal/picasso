import React, { FunctionComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import MUIStep, { StepProps } from '@material-ui/core/Step'

import { ExtendElementProps } from '../Picasso'
import styles from './styles'

export interface Props extends StepProps, ExtendElementProps {}

export const Step: FunctionComponent<Props> = props => {
  const { active, children, completed, index, elementSelector } = props

  return (
    <MUIStep
      active={active}
      completed={completed}
      index={index}
      data-qa={elementSelector}
    >
      {children}
    </MUIStep>
  )
}

Step.displayName = 'Step'

export default withStyles(styles)(Step)
