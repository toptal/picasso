import React, { FunctionComponent, ReactElement, ReactNode } from 'react'
import { withStyles } from '@material-ui/core/styles'
import MUIChip from '@material-ui/core/Chip'

import { StandardProps } from '../Picasso'
import styles from './styles'

interface Props extends StandardProps {
  /** Text content of the `Chip` component */
  label?: ReactNode
  /** Delete icon component */
  deleteIcon?: ReactElement
  /** A callback which is invoked after remove `deleteIcon` is clicked */
  onDelete?: () => void
}

const Chip: FunctionComponent<Props> = ({
  classes,
  className,
  style,
  deleteIcon,
  label,
  onDelete
}) => (
  <MUIChip
    classes={classes}
    className={className}
    style={style}
    label={label}
    deleteIcon={deleteIcon}
    onDelete={onDelete}
  />
)

export default withStyles(styles)(Chip)
