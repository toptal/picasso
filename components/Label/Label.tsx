import { withStyles } from '@material-ui/core/styles'
import { ClassNameMap } from '@material-ui/core/styles/withStyles'
import CloseIcon from '@material-ui/icons/Close'
import React from 'react'

import Chip from '../Chip'
import LabelGroup from '../LabelGroup'
import styles from './styles'

interface Props {
  classes: Partial<ClassNameMap<string>>
  /** Text content of the `Label` component */
  label?: string
  /** A callback which is invoked after remove `Icon` is clicked
   *
   * Please note that specifying this callback automatically adds remove `Icon` as children of the `Label`
   */
  onDelete?: () => void
  /** Style variant of the label */
  variant?: 'flat' | 'success' | 'error'
}

// should be moved to some global interfaces place
interface GroupFunctionalComponent<T> extends React.FunctionComponent<T> {
  Group: React.ReactNode
}

export const Label: GroupFunctionalComponent<Props> = props => {
  const { classes, variant, ...rest } = props

  const rootClass = variant ? classes[variant] : ''

  return (
    <Chip
      classes={{ root: rootClass }}
      deleteIcon={
        <CloseIcon
          aria-label='delete icon'
          className={classes.deleteIcon}
          role='button'
        />
      }
      {...rest}
    />
  )
}

Label.defaultProps = {
  classes: {},
  label: undefined,
  onDelete: undefined,
  variant: undefined
}

Label.displayName = 'Label'

Label.Group = LabelGroup

export default withStyles(styles)(Label)
