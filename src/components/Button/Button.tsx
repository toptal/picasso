import React, { ReactNode, ReactElement, MouseEvent, forwardRef } from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import ButtonBase from '@material-ui/core/ButtonBase'

import Loader from '../Loader'
import Container from '../Container'
import Group from '../ButtonGroup'
import kebabToCamelCase from '../utils/kebab-to-camel-case'
import {
  StandardProps,
  PicassoComponentWithRef,
  SizeType,
  ButtonOrAnchorProps,
  CompoundedComponentWithRef
} from '../Picasso'
import styles from './styles'

type VariantType =
  | 'primary-blue'
  | 'secondary-blue'
  | 'primary-red'
  | 'secondary-red'
  | 'primary-green'
  | 'flat'
  | 'flat-white'
  | 'secondary-white'

type IconPositionType = 'left' | 'right'

export interface Props extends StandardProps, ButtonOrAnchorProps {
  /** Show button in the active state (left mouse button down) */
  active?: boolean
  /** Disables button */
  disabled?: boolean
  /** Content of Button component */
  children?: ReactNode
  // TODO: should it be exposed?
  focused?: boolean
  /** Take the full width of a container */
  fullWidth?: boolean
  /** Set hovered style for the button */
  hovered?: boolean
  /** Add an `<Icon />` along Button's children */
  icon?: ReactElement
  /** Icon can be positioned on the left or right */
  iconPosition?: IconPositionType
  /** A button can show a loading indicator */
  loading?: boolean
  /** Callback invoked when component is clicked */
  onClick?: (event: MouseEvent<HTMLButtonElement & HTMLAnchorElement>) => void
  /** A button can have different sizes */
  size?: SizeType<'small' | 'medium' | 'large'>
  /** The variant to use */
  variant?: VariantType
  /** HTML Value of Button component */
  value?: string | number
  /** Circular style of Button component */
  circular?: boolean
  /** HTML title of Button component */
  title?: string
  /** HTML type of Button component **/
  type?: 'button' | 'reset' | 'submit'
}

interface StaticProps {
  Group: typeof Group
}

const getVariantType = (variant: VariantType) => {
  const [type] = variant!.split('-')

  return type
}

export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  {
    icon,
    iconPosition,
    loading,
    children,
    classes,
    className,
    style,
    fullWidth,
    variant,
    size,
    focused,
    hovered,
    disabled,
    active,
    onClick,
    circular,
    title,
    value,
    type,
    ...rest
  },
  ref
) {
  const {
    icon: iconClass,
    iconLeft: iconLeftClass,
    iconRight: iconRightClass,
    iconSmall: iconSmallClass,
    root: rootClass,
    hidden: hiddenClass,
    loader: loaderClass,
    content: contentClass
  } = classes

  let finalChildren = [children]

  if (icon) {
    const iconComponent = React.cloneElement(icon, {
      className: cx(iconClass, icon.props.className, {
        [iconLeftClass]: children && iconPosition === 'left',
        [iconRightClass]: children && iconPosition === 'right',
        [iconSmallClass]: size === 'small'
      }),
      key: 'button-icon',
      base: size === 'small' ? '12' : undefined
    })

    if (iconPosition === 'left') {
      finalChildren.unshift(iconComponent)
    } else {
      finalChildren.push(iconComponent)
    }
  }

  const variantType = getVariantType(variant!)
  const variantClassName = disabled
    ? classes[`${variantType}Disabled`]
    : classes[kebabToCamelCase(variant!)]
  const sizeClassName = classes[size!]

  const rootClassName = cx(
    {
      [classes.fullWidth]: fullWidth,
      [classes.active]: active,
      [classes.focused]: focused,
      [classes.hovered]: hovered,
      [classes.circular]: circular
    },
    sizeClassName,
    variantClassName,
    rootClass
  )

  return (
    <ButtonBase
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      ref={ref}
      classes={{
        root: rootClassName
      }}
      onClick={onClick}
      className={className}
      style={style}
      disabled={disabled}
      title={title}
      value={value}
      type={type}
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
}) as CompoundedComponentWithRef<Props, HTMLButtonElement, StaticProps>

Button.defaultProps = {
  active: false,
  children: null,
  circular: false,
  disabled: false,
  focused: false,
  fullWidth: false,
  hovered: false,
  iconPosition: 'left',
  loading: false,
  onClick: () => {},
  size: 'medium',
  type: 'button',
  variant: 'primary-blue'
}

Button.displayName = 'Button'

Button.Group = Group

export default withStyles(styles)(Button) as PicassoComponentWithRef<
  Props,
  HTMLButtonElement,
  StaticProps
>
