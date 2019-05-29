import React, { FunctionComponent, ReactNode, ReactElement } from 'react'
import { withStyles } from '@material-ui/core/styles'
import CloseIcon from '@material-ui/icons/Close'

import Chip from '../Chip'
import LabelGroup from '../LabelGroup'
import { StandardProps, PicassoComponent } from '../Picasso'
import styles from './styles'

export interface Props extends StandardProps {
  /** Text content of the `Label` component */
  children: ReactNode
  /** A callback which is invoked after remove `Icon` is clicked
   *
   * Please note that specifying this callback automatically adds remove `Icon` as children of the `Label`
   */
  onDelete?: () => void
  /** Specify the icon which should be rendered inside Label */
  icon?: ReactElement
}

interface StaticProps {
  Group: typeof LabelGroup
}

export const Label: FunctionComponent<Props> & StaticProps = ({
  classes,
  children,
  className,
  icon,
  style,
  onDelete
}) => {
  return (
    <Chip
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
      icon={icon}
    />
  )
}

Label.defaultProps = {
  children: '',
  onDelete: undefined
}

Label.displayName = 'Label'

Label.Group = LabelGroup

export default withStyles(styles)(Label) as PicassoComponent<Props, StaticProps>
