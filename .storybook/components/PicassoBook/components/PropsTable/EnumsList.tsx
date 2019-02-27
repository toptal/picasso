import { withStyles } from '@material-ui/core/styles'

import React from 'react'
import _ from 'lodash'

import { ClassNameMap } from '@material-ui/core/styles/withStyles'
import cx from 'classnames'

import styles from './styles'

interface Props {
  enums: string[]
  classes: Partial<ClassNameMap<string>>
}

const EnumsList: React.FunctionComponent<Props> = props => {
  const { enums, classes } = props

  return (
    <div className={classes.enums}>
      <strong>Enums:</strong>

      {enums.map(enumValue => (
        <span key={enumValue} className={cx(classes.highlight, classes.enum)}>
          {enumValue}
        </span>
      ))}
    </div>
  )
}

export default withStyles(styles)(EnumsList)
