import React from 'react'
import PropTypes from 'prop-types'
import MUIButton from '@material-ui/core/Button'
import withStyles from '@material-ui/core/styles/withStyles'

import { VARIANTS, createButtonVariant } from './styles'
import PicassoTheme from '../theme'

// Register global theme overrides to provider
PicassoTheme.overrides(({ theme }) => ({
  MuiButton: {
    containedPrimary: createButtonVariant(
      VARIANTS.containedPrimary,
      theme.pallete.primary.main,
      theme.pallete.primary.main
    ),
    containedSecondary: createButtonVariant(
      VARIANTS.containedSecondary,
      theme.pallete.secondary.main,
      theme.pallete.secondary.main
    ),
    outlinedPrimary: createButtonVariant(
      VARIANTS.outlinedPrimary,
      theme.pallete.primary.main,
      theme.pallete.primary.main
    ),
    outlinedSecondary: createButtonVariant(
      VARIANTS.outlinedSecondary,
      theme.pallete.secondary.main,
      theme.pallete.secondary.main
    ),
    outlined: createButtonVariant(
      VARIANTS.outlined,
      theme.pallete.grey[50],
      theme.pallete.grey[100]
    ),
    flat: createButtonVariant(
      VARIANTS.flat,
      theme.pallete.grey[100],
      theme.pallete.grey[100]
    ),
    flatPrimary: createButtonVariant(
      VARIANTS.flat,
      theme.pallete.primary.main,
      theme.pallete.primary.main
    ),
    flatSecondary: createButtonVariant(
      VARIANTS.flat,
      theme.pallete.secondary.main,
      theme.pallete.secondary.main
    )
  }
}))

const styles = {
  icon: {
    fontSize: '1em',
    paddingRight: '0.75em'
  }
}

const Button = props => {
  const { icon, children, classes, ...rest } = props
  const finalChildren = [children]

  if (icon) {
    const iconComponent = React.cloneElement(icon, { className: classes.icon })

    finalChildren.unshift(iconComponent)
  }

  return <MUIButton {...rest}>{finalChildren}</MUIButton>
}

Button.propTypes = {
  icon: PropTypes.node
}

Button.defaultProps = {
  icon: null
}

export default withStyles(styles)(Button)
