import React, {
  forwardRef,
  ReactNode,
  ReactElement,
  HTMLAttributes
} from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import cx from 'classnames'
import { BaseProps, CompoundedComponentWithRef } from '@toptal/picasso-shared'

import Chip from '../Chip'
import { CloseMinor16 } from '../Icon'
import LabelGroup from '../LabelGroup'
import styles from './styles'
import { transformToTitleCase } from '../utils'

type VariantType = 'grey' | 'white' | 'green' | 'yellow' | 'red'

export interface Props extends BaseProps, HTMLAttributes<HTMLDivElement> {
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
  /** Defines if the text should be transformed to title case */
  titleCase?: boolean
}

interface StaticProps {
  Group: typeof LabelGroup
}

const useStyles = makeStyles<Theme, Props>(styles, { name: 'PicassoLabel' })

// eslint-disable-next-line react/display-name
export const Label = forwardRef<HTMLDivElement, Props>(function Label(
  props,
  ref
) {
  const {
    children,
    style,
    className,
    icon,
    disabled,
    onDelete,
    variant,
    titleCase,
    ...rest
  } = props
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { color, ...htmlAttributes } = rest
  const classes = useStyles(props)

  const handleDelete = () => {
    if (disabled) {
      return
    }

    if (onDelete) {
      onDelete()
    }
  }

  return (
    <Chip
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...htmlAttributes}
      ref={ref}
      classes={{
        root: cx(classes.root, classes[variant!], {
          [classes.disabled]: disabled
        })
      }}
      className={className}
      style={style}
      icon={icon}
      label={
        <span className={classes.innerLabel}>
          {titleCase ? transformToTitleCase(children) : children}
        </span>
      }
      deleteIcon={
        <span
          aria-label='delete icon'
          role='button'
          className={classes.deleteIcon}
        >
          <CloseMinor16 />
        </span>
      }
      onDelete={onDelete ? handleDelete : undefined}
    />
  )
}) as CompoundedComponentWithRef<Props, HTMLDivElement, StaticProps>

Label.defaultProps = {
  children: '',
  variant: 'grey',
  titleCase: false
}

Label.displayName = 'Label'

Label.Group = LabelGroup

export default Label
