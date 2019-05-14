import React, { FunctionComponent, ReactNode } from 'react'
import { Overwrite } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import CloseIcon from '@material-ui/icons/Close'

import Chip from '../Chip'
import LabelGroup from '../LabelGroup'
import { StandardProps, JssProps } from '../Picasso'
import styles from './styles'

export interface Props extends StandardProps {
  /** Text content of the `Label` component */
  children: ReactNode
  /** A callback which is invoked after remove `Icon` is clicked
   *
   * Please note that specifying this callback automatically adds remove `Icon` as children of the `Label`
   */
  onDelete?: () => void
  /** Style variant of the label */
  variant?: 'flat' | 'success' | 'error'
}

interface StaticProps {
  Group: typeof LabelGroup
}

export const Label: FunctionComponent<Props> & StaticProps = ({
  classes,
  variant,
  children,
  className,
  style,
  onDelete
}) => {
  const rootClass = variant ? classes[variant] : ''

  return (
    <Chip
      classes={{ root: rootClass }}
      className={className}
      style={style}
      deleteIcon={
        <CloseIcon
          aria-label='delete icon'
          className={classes.deleteIcon}
          role='button'
        />
      }
      onDelete={onDelete}
      label={children}
    />
  )
}

Label.defaultProps = {
  children: '',
  onDelete: undefined,
  variant: undefined
}

Label.displayName = 'Label'

Label.Group = LabelGroup

export default withStyles(styles)(Label) as FunctionComponent<
  Overwrite<Props, Partial<JssProps>>
> &
  StaticProps
