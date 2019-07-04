import React, { FunctionComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'

import { StandardProps } from '../Picasso'
import styles from './styles'

export interface Props extends StandardProps {}

export const HelpBox: FunctionComponent<Props> = props => {
  return null
}

HelpBox.defaultProps = {}

HelpBox.displayName = 'HelpBox'

export default withStyles(styles)(HelpBox)
