import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import minusSvg from '../Icons/minus.svg'
import styles from './styles'

const IndeterminateIcon = ({ classes }) => (
  <div className={classes.indeterminateIcon}>
    {/* // TODO: Replace with Icon component and remove fill prop from svg */}
    <img src={minusSvg} />
  </div>
)

IndeterminateIcon.propTypes = {
  classes: PropTypes.shape({
    indeterminateIcon: PropTypes.string
  })
}

export default withStyles(styles)(IndeterminateIcon)
