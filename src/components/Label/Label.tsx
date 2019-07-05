import React, {
  FunctionComponent,
  ReactNode,
  ReactElement,
  HTMLAttributes
} from 'react'
import { withStyles } from '@material-ui/core/styles'

import { CloseMinor16 } from '../Icon'
import Chip from '../Chip'
import LabelGroup from '../LabelGroup'
import { StandardProps, PicassoComponent } from '../Picasso'
import styles from './styles'

export interface Props extends StandardProps, HTMLAttributes<HTMLDivElement> {
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
  onDelete,
  ...rest
}) => {
  return (
    <Chip
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      className={className}
      style={style}
      deleteIcon={
        <span
          aria-label='delete icon'
          role='button'
          className={classes.deleteIcon}
        >
          <CloseMinor16 />
        </span>
      }
      onDelete={onDelete}
      label={children}
      icon={icon}
    />
  )
}

Label.defaultProps = {
  children: ''
}

Label.displayName = 'Label'

Label.Group = LabelGroup

export default withStyles(styles)(Label) as PicassoComponent<Props, StaticProps>
