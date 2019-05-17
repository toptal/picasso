import React, {
  FunctionComponent,
  ReactNode,
  ReactElement,
  MouseEvent
} from 'react'
import cx from 'classnames'
import { Overwrite } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import ButtonBase from '@material-ui/core/ButtonBase'

import Loader from '../Loader'
import Container from '../Container'
import Group from '../ButtonGroup'
import kebabToCamelCase from '../utils/kebab-to-camel-case'
import { StandardProps, JssProps, SizeType } from '../Picasso'
import styles from './styles'

type VariantType =
  | 'primary-blue'
  | 'secondary-blue'
  | 'primary-red'
  | 'secondary-red'
  | 'primary-green'
  | 'flat'
  | 'secondary-white'

type IconPositionType = 'left' | 'right'

export interface Props extends StandardProps {
  /** Show button in the active state (left mouse button down) */
  active?: boolean
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
  /** A button can show a loading indicator */
  loading?: boolean
  /** Callback invoked when component is clicked */
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
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
}

interface StaticProps {
  Group: typeof Group
}

export const Button: FunctionComponent<Props> & StaticProps = ({
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
  value
}) => {
  const {
    icon: iconClass,
    iconLeft: iconLeftClass,
    iconRight: iconRightClass,
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
        [iconRightClass]: children && iconPosition === 'right'
      }),
      key: 'button-icon'
    })

    if (iconPosition === 'left') {
      finalChildren.unshift(iconComponent)
    } else {
      finalChildren.push(iconComponent)
    }
  }

  const [type] = variant!.split('-')
  const variantClassName = disabled
    ? classes[`${type}Disabled`]
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
      classes={{
        root: rootClassName
      }}
      onClick={onClick}
      className={className}
      style={style}
      disabled={disabled}
      title={title}
      value={value}
    >
      <Container
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
}

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
  variant: 'primary-blue'
}

Button.displayName = 'Button'

Button.Group = Group

export default withStyles(styles)(Button) as FunctionComponent<
  Overwrite<Props, Partial<JssProps>>
> &
  StaticProps
