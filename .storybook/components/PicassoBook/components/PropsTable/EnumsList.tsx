import { withStyles } from '@material-ui/core/styles'

import React from 'react'

import { Classes } from '../../../../../components/styles/types'
import { PropTypeDocumentation } from '../../../../utils/documentationGenerator'
import cx from 'classnames'

import styles from './styles'

interface Props {
  enums?: string[]
  classes: Classes
  type: string | PropTypeDocumentation
}

const trim = (value: string) => String(value).replace(/\'|\"/gi, '')

const EnumsList: React.FunctionComponent<Props> = props => {
  const { enums, classes, type } = props
  let enumList = enums

  if (!Array.isArray(enums)) {
    if (Array.isArray((type as PropTypeDocumentation).enums)) {
      enumList = (type as PropTypeDocumentation).enums
    }
  }

  if (!Array.isArray(enumList)) return null

  return (
    <div className={classes.enums}>
      <strong className={classes.enumLabel}>Enums:</strong>

      {enumList.map(enumValue => (
        <span key={enumValue} className={cx(classes.highlight, classes.enum)}>
          {trim(enumValue)}
        </span>
      ))}
    </div>
  )
}

export default withStyles(styles)(EnumsList)
