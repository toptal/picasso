import React from 'react'

import useStyles from './styles'

export const DrodpdownPlaceholder: React.FunctionComponent = ({ children }) => {
  const classes = useStyles()

  return (
    <React.Fragment>
      {children}
      <span className={classes.arrow} />
    </React.Fragment>
  )
}

DrodpdownPlaceholder.displayName = 'DropdownPlaceholder'

export default DrodpdownPlaceholder
