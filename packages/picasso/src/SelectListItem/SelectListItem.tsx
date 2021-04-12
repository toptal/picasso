import MUIMenuItem from '@material-ui/core/MenuItem'
import { makeStyles, Theme } from '@material-ui/core/styles'
import capitalize from '@material-ui/core/utils/capitalize'
import {
  BaseProps,
  ButtonOrAnchorProps,
  OverridableComponent,
  SizeType,
  TextLabelProps,
  useTitleCase
} from '@toptal/picasso-shared'
import cx from 'classnames'
import React, {
  ElementType,
  forwardRef,
  HTMLAttributes,
  LiHTMLAttributes,
  ReactNode
} from 'react'

import Container from '../Container'
import { CheckMinor16, ChevronMinor16 } from '../Icon'
import toTitleCase from '../utils/to-title-case'
import styles from './styles'

export type VariantType = 'light' | 'dark'

export type SelectListItemAttributes = LiHTMLAttributes<HTMLLIElement> &
  HTMLAttributes<HTMLDivElement> &
  ButtonOrAnchorProps

export interface Props
  extends BaseProps,
    TextLabelProps,
    SelectListItemAttributes {
  /** Component name to render the item as */
  as?: ElementType
  /** Whether to render disabled item */
  disabled?: boolean
  /** Whether to render without internal padding */
  disableGutters?: boolean
  /** Highlights the item as selected */
  selected?: boolean
  /** Adds an arrow to the item */
  nested?: boolean
  /** Checkmarks the item */
  checkmarked?: boolean
  /** Value of the item */
  value?: string | Readonly<string[]> | number
  /** Variant of colors */
  variant?: VariantType
  /** Size of component */
  size?: SizeType<'small' | 'medium'>
  /** Disables changing colors on hover/focus */
  nonSelectable?: boolean
  /** The main content of the item */
  children?: ReactNode
  /** The additional description */
  description?: ReactNode
  /** Callback when item is clicked */
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoSelectListItem'
})

export const SelectListItem: OverridableComponent<Props> = forwardRef<
  HTMLElement,
  Props
>(function SelectListItem (props, ref) {
  const {
    as = 'li',
    children,
    description,
    className,
    disabled,
    disableGutters,
    nested,
    selected,
    checkmarked,
    style,
    value,
    variant = 'light',
    size,
    titleCase: propsTitleCase,
    nonSelectable,
    ...rest
  } = props
  const classes = useStyles()
  const titleCase = useTitleCase(propsTitleCase)

  return (
    <MUIMenuItem
      {...rest}
      ref={ref}
      component={as}
      classes={{
        root: cx({
          [classes[`gutters${size && capitalize(size)}`]]: size
        }),
        selected: classes.selected
      }}
      className={cx(classes.root, classes[variant], className, {
        [classes.nonSelectable]: nonSelectable
      })}
      disabled={disabled}
      disableGutters={disableGutters}
      style={style}
      value={value}
      selected={selected}
    >
      <Container flex direction='column' className={classes.content}>
        <Container flex alignItems='center'>
          {checkmarked !== undefined && (
            <Container
              className={classes.iconContainer}
              flex
              inline
              right='xsmall'
            >
              {checkmarked && <CheckMinor16 />}
            </Container>
          )}
          {typeof children === 'string' ? (
            <span
              className={cx(classes.stringContent, {
                [classes[`stringContent${size && capitalize(size)}`]]: size,
                [classes.stringContentSemibold]: checkmarked
              })}
              style={style}
            >
              {titleCase ? toTitleCase(children) : children}
            </span>
          ) : (
            children
          )}
          {nested && (
            <Container flex inline left='xsmall'>
              <ChevronMinor16 />
            </Container>
          )}
        </Container>
        {description && (
          <Container
            className={classes.description}
            left={checkmarked === undefined ? undefined : 'medium'}
            top={0.25}
          >
            {description}
          </Container>
        )}
      </Container>
    </MUIMenuItem>
  )
})

SelectListItem.defaultProps = {
  as: 'li',
  variant: 'light',
  nonSelectable: false
}

SelectListItem.displayName = 'SelectListItem'

export default SelectListItem
