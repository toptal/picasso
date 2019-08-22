import React, {
  FunctionComponent,
  ReactNode,
  ReactElement,
  HTMLAttributes
} from 'react'
import { withStyles } from '@material-ui/core/styles'
import cx from 'classnames'

import { CloseMinor16 } from '../Icon'
import Chip from '../Chip'
import LabelGroup from '../LabelGroup'
import { StandardProps, PicassoComponent } from '../Picasso'
import styles from './styles'

type VariantType = 'grey' | 'white'

export interface Props extends StandardProps, HTMLAttributes<HTMLDivElement> {
  /** Text content of the `Label` component */
  children: ReactNode
  /** Specify the icon which should be rendered inside Label */
  icon?: ReactElement
  /** Defines if `Label` is disabled */
  disabled?: boolean
  /** A callback which is invoked after remove `Icon` is clicked
   *
   * Please note that specifying this callback automatically adds remove `Icon` as children of the `Label`
   */
  onDelete?: () => void
  /** Variant of the `Label` */
  variant?: VariantType
}

interface StaticProps {
  Group: typeof LabelGroup
}

export const Label: FunctionComponent<Props> & StaticProps = ({
  children,
  classes,
  style,
  className,
  icon,
  disabled,
  onDelete,
  variant,
  ...rest
}) => (
  <Chip
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...rest}
    classes={{
      root: cx(classes[variant!], {
        [classes.disabled]: disabled
      })
    }}
    className={className}
    style={style}
    deleteIcon={
      <span aria-label='delete icon' role='button'>
        <CloseMinor16 />
      </span>
    }
    onDelete={onDelete}
    label={children}
    icon={icon}
  />
)

Label.defaultProps = {
  children: '',
  variant: 'grey'
}

Label.displayName = 'Label'

Label.Group = LabelGroup

export default withStyles(styles)(Label) as PicassoComponent<Props, StaticProps>
