import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import ButtonBase from '@material-ui/core/ButtonBase'

import styles from './styles'
import Loader from '../Loader'
import Group from '../ButtonGroup'

const VARIANTS = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  FLAT: 'flat',
  BASIC: 'basic',
  POSITIVE: 'positive',
  NEGATIVE: 'negative',
  DEFAULT: 'default'
}
const SIZES = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large'
}
const ICON_POSITIONS = {
  LEFT: 'left',
  RIGHT: 'right'
}

const Button = props => {
  const {
    icon,
    iconPosition,
    loading,
    children,
    classes,
    fullWidth,
    variant,
    size,
    focused,
    hovered,
    active,
    onClick,
    ...rest
  } = props
  const {
    icon: iconClass,
    iconLeft: iconLeftClass,
    iconRight: iconRightClass,
    root: rootClass,
    children: childrenClass,
    hidden: hiddenClass,
    loader: loaderClass
  } = classes

  let finalChildren = [children]

  if (icon) {
    const iconComponent = React.cloneElement(icon, {
      className: cx(iconClass, {
        [iconLeftClass]: children && iconPosition === ICON_POSITIONS.LEFT,
        [iconRightClass]: children && iconPosition === ICON_POSITIONS.RIGHT
      }),
      key: 'button-icon'
    })

    if (iconPosition === ICON_POSITIONS.LEFT) {
      finalChildren.unshift(iconComponent)
    } else {
      finalChildren.push(iconComponent)
    }
  }

  const variantClassName = classes[variant] || ''
  const sizeClassName = classes[size] || ''

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
      {...rest}
    >
      <div className={cx(childrenClass, { [hiddenClass]: loading })}>
        {finalChildren}
      </div>

      {loading && <Loader className={loaderClass} inline size='small' />}
    </ButtonBase>
  )
}

Button.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node,
  focused: PropTypes.bool,
  fullWidth: PropTypes.bool,
  hovered: PropTypes.bool,
  icon: PropTypes.node,
  iconPosition: PropTypes.oneOf(Object.values(ICON_POSITIONS)),
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  size: PropTypes.oneOf(Object.values(SIZES)),
  variant: PropTypes.oneOf(Object.values(VARIANTS))
}

Button.defaultProps = {
  active: false,
  children: null,
  focused: false,
  fullWidth: false,
  hovered: false,
  icon: null,
  iconPosition: ICON_POSITIONS.LEFT,
  loading: false,
  onClick: () => {},
  size: VARIANTS.MEDIUM,
  variant: VARIANTS.DEFAULT
}

Button.Group = Group

export default withStyles(styles)(Button)
