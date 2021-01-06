import React, { FunctionComponent } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { StandardProps } from '@toptal/picasso-shared'

import { PropTypeDocumentation } from '~/.storybook/utils/documentation-generator'
import cx from 'classnames'

import styles from './styles'

interface Props extends StandardProps {
  enums?: string[]
  type: string | PropTypeDocumentation
}

const trim = (value: string) => String(value).replace(/\'|\"/gi, '')

const useStyles = makeStyles<Theme>(styles, { name: 'PicassoEnumsList' })

const EnumsList: FunctionComponent<Props> = props => {
  const { enums, type } = props

  const classes = useStyles()

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

EnumsList.displayName = 'EnumsList'

export default EnumsList
