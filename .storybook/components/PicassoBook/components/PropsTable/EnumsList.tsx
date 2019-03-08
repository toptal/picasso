import { withStyles } from '@material-ui/core/styles'

import React from 'react'
import _ from 'lodash'

import { ClassNameMap } from '@material-ui/core/styles/withStyles'
import cx from 'classnames'

import styles from './styles'

interface Props {
  enums: string[]
  classes: Partial<ClassNameMap<string>>
  type: { enums: string[] }
}

const trim = (value: string) => String(value).replace(/\'|\"/gi, '')

const EnumsList: React.FunctionComponent<Props> = props => {
  const { enums, classes, type } = props
  let enumList: string[] = enums

  if (!_.isArray(enums)) {
    if (_.isArray(type.enums)) {
      enumList = type.enums
    }
  }

  if (!_.isArray(enumList)) return null

  return (
    <div className={classes.enums}>
      <strong>Enums:</strong>

      {enumList.map(enumValue => (
        <span key={enumValue} className={cx(classes.highlight, classes.enum)}>
          {trim(enumValue)}
        </span>
      ))}
    </div>
  )
}

export default withStyles(styles)(EnumsList)
