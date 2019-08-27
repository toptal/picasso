import React, {
  forwardRef,
  ReactNode,
  ReactElement,
  HTMLAttributes
} from 'react'
import { withStyles } from '@material-ui/core/styles'
import cx from 'classnames'

import Chip from '../Chip'
import { CloseMinor16 } from '../Icon'
import LabelGroup from '../LabelGroup'
import {
  StandardProps,
  CompoundedComponentWithRef,
  PicassoComponentWithRef
} from '../Picasso'
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

// eslint-disable-next-line react/display-name
export const Label = forwardRef<HTMLDivElement, Props>(function Label(
  {
    children,
    classes,
    style,
    className,
    icon,
    disabled,
    onDelete,
    variant,
    ...rest
  },
  ref
) {
  const handleDelete = () => {
    if (disabled) {
      return
    }

    if (onDelete) {
      onDelete()
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { color, ...htmlAttributes } = rest

  return (
    <Chip
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...htmlAttributes}
      ref={ref}
      classes={{
        root: cx(
          classes.root,
          classes.icon,
          classes.deleteIcon,
          classes[variant!],
          {
            [classes.disabled]: disabled
          }
        )
      }}
      className={className}
      style={style}
      icon={icon}
      label={<span className={classes.innerLabel}>{children}</span>}
      deleteIcon={
        <span aria-label='delete icon' role='button'>
          <CloseMinor16 />
        </span>
      }
      onDelete={onDelete ? handleDelete : undefined}
    />
  )
}) as CompoundedComponentWithRef<Props, HTMLDivElement, StaticProps>

Label.defaultProps = {
  children: '',
  variant: 'grey'
}

Label.displayName = 'Label'

Label.Group = LabelGroup

export default withStyles(styles)(Label) as PicassoComponentWithRef<
  Props,
  HTMLDivElement,
  StaticProps
>
