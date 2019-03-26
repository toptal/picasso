import React, { FunctionComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { ClassNameMap } from '@material-ui/core/styles/withStyles'
import CloseIcon from '@material-ui/icons/Close'

import Chip from '../Chip'
import LabelGroup from '../LabelGroup'
import styles from './styles'

interface Props {
  classes: Partial<ClassNameMap<string>>
  /** Text content of the `Label` component */
  children: React.ReactNode
  /** A callback which is invoked after remove `Icon` is clicked
   *
   * Please note that specifying this callback automatically adds remove `Icon` as children of the `Label`
   */
  onDelete?: () => void
  /** Style variant of the label */
  variant?: 'flat' | 'success' | 'error'
}

type LabeComponentType<P> = FunctionComponent<P> & {
  Group: typeof LabelGroup
}

export const Label: LabeComponentType<Props> = props => {
  const { classes, variant, children, ...rest } = props

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
      label={children}
      {...rest}
    />
  )
}

Label.defaultProps = {
  children: '',
  classes: {},
  onDelete: undefined,
  variant: undefined
}

Label.displayName = 'Label'

Label.Group = LabelGroup

export default withStyles(styles)(Label)
