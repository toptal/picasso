import React, {
  forwardRef,
  ReactNode,
  ReactElement,
  HTMLAttributes,
  AnchorHTMLAttributes,
  ElementType,
  MouseEvent
} from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import cx from 'classnames'
import { BaseProps, TextLabelProps, useTitleCase } from '@toptal/picasso-shared'

import Chip from '../Chip'
import { CloseMinor16 } from '../Icon'
import TagGroup from '../TagGroup'
import TagRectangular from '../TagRectangular'
import styles from './styles'
import toTitleCase from '../utils/to-title-case'
import TagConnection from './TagConnection'

type VariantType = 'grey' | 'blue' | 'green' | 'yellow' | 'red'

export type DivOrAnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> &
  HTMLAttributes<HTMLDivElement>

export interface Props extends BaseProps, TextLabelProps, DivOrAnchorProps {
  /** The component used for the root node. Either a string to use a DOM element or a component. */
  as?: ElementType
  /** Text content of the `Tag` component */
  children: ReactNode
  /** Specify the icon which should be rendered inside Tag */
  icon?: ReactElement
  /** Defines if `Tag` is disabled */
  disabled?: boolean
  /** A callback which is invoked after remove `Icon` is clicked
   *
   * Please note that specifying this callback automatically adds remove `Icon` as children of the `Tag`
   */
  onDelete?: () => void
  /** Variant of the `Tag` */
  variant?: VariantType
  /** ReactNode rendered after label */
  endAdornment?: ReactNode
  hovered?: boolean
}

const useStyles = makeStyles<Theme>(styles, { name: 'PicassoLabel' })

// eslint-disable-next-line react/display-name
export const Tag = forwardRef<HTMLDivElement, Props>(function Tag(props, ref) {
  const {
    as = 'div',
    className,
    disabled,
    endAdornment,
    hovered,
    children,
    icon,
    onDelete,
    style,
    titleCase: propsTitleCase,
    variant = 'grey',
    ...rest
  } = props
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { color, ...htmlAttributes } = rest
  const classes = useStyles()

  const titleCase = useTitleCase(propsTitleCase)

  const handleDelete = (event: MouseEvent) => {
    if (disabled) {
      return
    }

    if (onDelete) {
      event.preventDefault()
      onDelete()
    }
  }

  return (
    <Chip
      {...htmlAttributes}
      ref={ref}
      classes={{
        root: classes.root,
        label: classes.label,
        clickable: classes.clickable
      }}
      className={cx(className, classes[variant], {
        [classes.hovered]: hovered,
        [classes.disabled]: disabled
      })}
      style={style}
      icon={
        icon
          ? React.cloneElement(icon, {
              color: disabled ? 'grey' : 'darkGrey'
            })
          : undefined
      }
      label={
        <>
          <span className={classes.innerLabel}>
            {titleCase ? toTitleCase(children) : children}
          </span>
          {endAdornment}
        </>
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
      component={as}
      onDelete={onDelete ? handleDelete : undefined}
      aria-disabled={disabled}
    />
  )
})

Tag.defaultProps = {
  as: 'div',
  children: '',
  variant: 'grey'
}

Tag.displayName = 'Tag'

export default Object.assign(Tag, {
  Group: TagGroup,
  Rectangular: TagRectangular,
  Connection: TagConnection
})
