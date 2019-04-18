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
import { StandardProps, JssProps, SizeType } from '../Picasso'
import styles from './styles'

type VariantType =
  | 'primary'
  | 'secondary'
  | 'flat'
  | 'basic'
  | 'success'
  | 'error'
  | 'default'

type IconPositionType = 'left' | 'right'

interface Props extends StandardProps {
  /** Show button in the active state (left mouse button down) */
  active?: boolean
  /** Disables button */
  disabled?: boolean
  /** Content of Button component */
  children?: ReactNode
  focused?: boolean
  /** Take the full width of a container */
  fullWidth?: boolean
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
  onClick
}) => {
  const {
    icon: iconClass,
    iconLeft: iconLeftClass,
    iconRight: iconRightClass,
    root: rootClass,
    hidden: hiddenClass,
    loader: loaderClass
  } = classes

  let finalChildren = [children]

  if (icon) {
    const iconComponent = React.cloneElement(icon, {
      className: cx(iconClass, {
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

  const variantClassName = classes[variant!]
  const sizeClassName = classes[size!]

  const rootClassName = cx(
    {
      [classes.fullWidth]: fullWidth,
      [classes.active]: active,
      [classes.focused]: focused,
      [classes.hovered]: hovered
    },
    variantClassName,
    sizeClassName,
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
    >
      <Container
        inline
        flex
        direction='row'
        alignItems='center'
        className={cx({ [hiddenClass]: loading })}
      >
        {finalChildren}
      </Container>

      {loading && <Loader className={loaderClass} inline size='small' />}
    </ButtonBase>
  )
}

Button.defaultProps = {
  active: false,
  children: null,
  disabled: false,
  focused: false,
  fullWidth: false,
  hovered: false,
  iconPosition: 'left',
  loading: false,
  onClick: () => {},
  size: 'medium',
  variant: 'default'
}

Button.displayName = 'Button'

Button.Group = Group

export default withStyles(styles)(Button) as FunctionComponent<
  Overwrite<Props, Partial<JssProps>>
> &
  StaticProps
