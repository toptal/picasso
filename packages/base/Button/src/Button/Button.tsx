import type { ReactNode, ReactElement, MouseEvent, ElementType } from 'react'
import React, { forwardRef } from 'react'
import cx from 'classnames'
import type {
  StandardProps,
  SizeType,
  ButtonOrAnchorProps,
  OverridableComponent,
  TextLabelProps,
  Classes,
} from '@toptal/picasso-shared'
import { useTitleCase } from '@toptal/picasso-shared'
import type { Theme } from '@material-ui/core'
import { makeStyles, ButtonBase } from '@material-ui/core'
import { Loader } from '@toptal/picasso-loader'
import { Container } from '@toptal/picasso-container'
import { noop, toTitleCase } from '@toptal/picasso-utils'
// we need to ensure the correct order of styles import
// TODO: [FX-4614] To be removed when Link component is migrated to tailwind
import { Link } from '@toptal/picasso-link'

import styles from './styles'

// HACK: This statement is only used to prevent webpack from tree shaking the import
void Link

const useStyles = makeStyles<Theme, Props>(styles, {
  name: 'PicassoButton',
})

export type VariantType =
  | 'primary'
  | 'negative'
  | 'positive'
  | 'secondary'
  | 'transparent'

export type IconPositionType = 'left' | 'right'

export interface Props
  extends StandardProps,
    TextLabelProps,
    ButtonOrAnchorProps {
  /** Show button in the active state (left mouse button down) */
  active?: boolean
  as?: ElementType
  /** Disables button */
  disabled?: boolean
  /** Content of Button component */
  children?: ReactNode
  focused?: boolean
  /** Take the full width of a container */
  fullWidth?: boolean
  /** Set hovered style for the button */
  hovered?: boolean
  /** Add an `<Icon />` along Button's children */
  icon?: ReactElement
  /** Icon can be positioned on the left or right */
  iconPosition?: IconPositionType
  /** Shows a loading indicator and disables click events */
  loading?: boolean
  /** Callback invoked when component is clicked */
  onClick?: (event: MouseEvent<HTMLButtonElement & HTMLAnchorElement>) => void
  /** A button can have different sizes */
  size?: SizeType<'small' | 'medium' | 'large'>
  /** The variant to use */
  variant?: VariantType
  /** HTML Value of Button component */
  value?: string | number
  /** HTML title of Button component */
  title?: string
  /** HTML type of Button component */
  type?: 'button' | 'reset' | 'submit'
}

const getClickHandler = (loading?: boolean, handler?: Props['onClick']) =>
  loading ? noop : handler

const getIcon = (
  classes: Classes,
  children: ReactNode,
  icon?: ReactElement,
  iconPosition?: IconPositionType
) => {
  if (!icon) {
    return null
  }

  const {
    icon: iconClass,
    iconLeft: iconLeftClass,
    iconRight: iconRightClass,
  } = classes

  return React.cloneElement(icon, {
    className: cx(iconClass, icon.props.className, {
      [iconLeftClass]: children && iconPosition === 'left',
      [iconRightClass]: children && iconPosition === 'right',
    }),
    key: 'button-icon',
  })
}

export const Button: OverridableComponent<Props> = forwardRef<
  HTMLButtonElement,
  Props
>(function Button(props, ref) {
  const {
    icon,
    iconPosition,
    loading,
    children,
    className,
    style,
    fullWidth,
    variant = 'primary',
    size = 'medium',
    focused,
    hovered,
    disabled,
    active,
    onClick,
    title,
    value,
    type,
    as = 'button',
    titleCase: propsTitleCase,
    ...rest
  } = props
  const classes = useStyles(props)

  const {
    root: rootClass,
    hidden: hiddenClass,
    loader: loaderClass,
    content: contentClass,
  } = classes

  const titleCase = useTitleCase(propsTitleCase)

  const finalChildren = [titleCase ? toTitleCase(children) : children]

  if (icon) {
    const iconComponent = getIcon(classes, children, icon, iconPosition)

    if (iconPosition === 'left') {
      finalChildren.unshift(iconComponent)
    } else {
      finalChildren.push(iconComponent)
    }
  }

  const variantClassName = classes[variant]
  const sizeClassName = classes[size]

  const rootClassName = cx(
    {
      [classes.fullWidth]: fullWidth,
      [classes.active]: active,
      [classes.focused]: focused,
      [classes.hovered]: hovered,
      [classes.disabled]: disabled,
    },
    sizeClassName,
    variantClassName,
    rootClass
  )

  return (
    <ButtonBase
      {...rest}
      ref={ref}
      classes={{
        root: rootClassName,
        focusVisible: cx(classes.focusVisible),
      }}
      onClick={getClickHandler(loading, onClick)}
      className={className}
      style={style}
      disabled={disabled}
      title={title}
      value={value}
      type={type}
      component={as}
      data-component-type='button'
    >
      <Container
        as='span'
        inline
        flex
        direction='row'
        alignItems='center'
        className={cx({ [hiddenClass]: loading }, contentClass)}
      >
        {finalChildren}
      </Container>

      {loading && (
        <Loader variant='inherit' className={loaderClass} inline size='small' />
      )}
    </ButtonBase>
  )
})

Button.defaultProps = {
  active: false,
  as: 'button',
  children: null,
  disabled: false,
  focused: false,
  fullWidth: false,
  hovered: false,
  iconPosition: 'left',
  loading: false,
  onClick: noop,
  size: 'medium',
  type: 'button',
  variant: 'primary',
}

Button.displayName = 'Button'

export default Button
