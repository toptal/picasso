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
      })
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
  focused: PropTypes.bool,
  fullWidth: PropTypes.bool,
  hovered: PropTypes.bool,
  icon: PropTypes.node,
  iconPosition: PropTypes.oneOf(Object.values(ICON_POSITIONS)),
  loading: PropTypes.bool,
  size: PropTypes.oneOf(Object.values(SIZES)),
  variant: PropTypes.oneOf(Object.values(VARIANTS))
}

Button.defaultProps = {
  active: false,
  focused: false,
  fullWidth: false,
  hovered: false,
  icon: null,
  iconPosition: ICON_POSITIONS.LEFT,
  loading: false,
  size: VARIANTS.MEDIUM,
  variant: VARIANTS.DEFAULT
}

Button.Group = Group

export default withStyles(styles)(Button)
