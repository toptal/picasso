import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import checkSvg from '../Icons/check.svg'
import styles from './styles'

const CheckedIcon = ({ classes }) => (
  <div className={classes.checkedIcon}>
    {/* // TODO: Replace with Icon component and remove fill prop from svg */}
    <img src={checkSvg} />
  </div>
)

CheckedIcon.propTypes = {
  classes: PropTypes.shape({
    checkedIcon: PropTypes.string
  })
}

export default withStyles(styles)(CheckedIcon)
