import React, { FunctionComponent } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import MUIStep, { StepProps } from '@material-ui/core/Step'
import { mergeClasses } from '@toptal/picasso-shared'

import styles from './styles'

export type Props = StepProps

const useStyles = makeStyles<Theme, Props>(styles, { name: 'PicassoStep' })

export const Step: FunctionComponent<Props> = props => {
  const {
    active,
    children,
    completed,
    classes: externalClasses,
    ...rest
  } = props
  const classes = mergeClasses(
    useStyles(props),
    externalClasses as Record<string, string>
  )

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <MUIStep {...rest} active={active} completed={completed} classes={classes}>
      {children}
    </MUIStep>
  )
}

Step.displayName = 'Step'

export default Step
