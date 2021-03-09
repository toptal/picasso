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
import {
  BaseProps,
  TextLabelProps,
  CompoundedComponentWithRef,
  useTitleCase
} from '@toptal/picasso-shared'

import Chip from '../Chip'
import { CloseMinor16 } from '../Icon'
import TagGroup from '../TagGroup'
import TagRectangular from '../TagRectangular'
import styles from './styles'
import toTitleCase from '../utils/to-title-case'

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
}

export interface StaticProps {
  Group: typeof TagGroup
  Rectangular: typeof TagRectangular
}

const useStyles = makeStyles<Theme>(styles, { name: 'PicassoLabel' })

// eslint-disable-next-line react/display-name
export const Tag = forwardRef<HTMLDivElement, Props>(function Tag(props, ref) {
  const {
    children,
    style,
    className,
    icon,
    disabled,
    onDelete,
    variant,
    as,
    titleCase: propsTitleCase,
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
        root: cx(classes.root, classes[variant!], {
          [classes.disabled]: disabled
        })
      }}
      className={className}
      style={style}
      icon={icon}
      label={
        <span className={classes.innerLabel} data-testid='tag-label'>
          {titleCase ? toTitleCase(children) : children}
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
      component={as!}
      onDelete={onDelete ? handleDelete : undefined}
    />
  )
}) as CompoundedComponentWithRef<Props, HTMLDivElement, StaticProps>

Tag.defaultProps = {
  as: 'div',
  children: '',
  variant: 'grey'
}

Tag.displayName = 'Tag'

Tag.Group = TagGroup
Tag.Rectangular = TagRectangular

export default Tag
