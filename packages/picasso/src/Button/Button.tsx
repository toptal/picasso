import React, {
  ReactNode,
  ReactElement,
  MouseEvent,
  forwardRef,
  ElementType
} from 'react'
import cx from 'classnames'
import ButtonBase from '@material-ui/core/ButtonBase'
import {
  BaseProps,
  SizeType,
  ButtonOrAnchorProps,
  CompoundedComponentWithRef,
  OverridableComponent,
  useTitleCase,
  TextLabelProps,
  Classes
} from '@toptal/picasso-shared'

// Keep it above because of order of makeStyles calls
// https://material-ui.com/styles/advanced/#makestyles-withstyles-styled
import useStyles from './styles'
import Loader from '../Loader'
import Container from '../Container'
import Group from '../ButtonGroup'
import Circular from '../ButtonCircular'
import Action from '../ButtonAction'
import toTitleCase from '../utils/to-title-case'

export type VariantType =
  | 'primary'
  | 'negative'
  | 'positive'
  | 'secondary'
  | 'transparent'

export type IconPositionType = 'left' | 'right'

export interface Props extends BaseProps, TextLabelProps, ButtonOrAnchorProps {
  /** Show button in the active state (left mouse button down) */
  active?: boolean
  /** The component used for the root node. Either a string to use a DOM element or a component. */
  as?: ElementType
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

export interface StaticProps {
  Group: typeof Group
  Circular: typeof Circular
  Action: typeof Action
}

const defaultOnClick = () => {}

const getClickHandler = (loading?: boolean, handler?: Props['onClick']) =>
  loading ? defaultOnClick : handler

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
    iconRight: iconRightClass
  } = classes

  return React.cloneElement(icon, {
    className: cx(iconClass, icon.props.className, {
      [iconLeftClass]: children && iconPosition === 'left',
      [iconRightClass]: children && iconPosition === 'right'
    }),
    key: 'button-icon'
  })
}

export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  props,
  ref
) {
  const {
    icon,
    iconPosition,
    loading,
    children,
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
    title,
    value,
    type,
    as,
    titleCase: propsTitleCase,
    ...rest
  } = props
  const classes = useStyles(props)

  const {
    root: rootClass,
    hidden: hiddenClass,
    loader: loaderClass,
    content: contentClass
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

  const variantClassName = classes[variant!]
  const sizeClassName = classes[size!]

  const rootClassName = cx(
    {
      [classes.fullWidth]: fullWidth,
      [classes.active]: active,
      [classes.focused]: focused,
      [classes.hovered]: hovered,
      [classes.disabled]: disabled
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
        root: rootClassName,
        focusVisible: cx(classes.focusVisible)
      }}
      onClick={getClickHandler(loading, onClick)}
      className={className}
      style={style}
      disabled={disabled}
      title={title}
      value={value}
      type={type}
      component={as!}
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
  as: 'button',
  children: null,
  disabled: false,
  focused: false,
  fullWidth: false,
  hovered: false,
  iconPosition: 'left',
  loading: false,
  onClick: defaultOnClick,
  size: 'medium',
  type: 'button',
  variant: 'primary'
}

Button.displayName = 'Button'

Button.Group = Group
Button.Circular = Circular
Button.Action = Action

export default Button as OverridableComponent<Props> & StaticProps
