import React, { FunctionComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import MUIStep, { StepProps } from '@material-ui/core/Step'

import styles from './styles'

export type Props = StepProps

export const Step: FunctionComponent<Props> = ({
  active,
  children,
  completed,
  ...rest
}) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <MUIStep {...rest} active={active} completed={completed}>
    {children}
  </MUIStep>
)

Step.displayName = 'Step'

export default withStyles(styles)(Step)
