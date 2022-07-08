import React, { FunctionComponent } from 'react'
import { BaseProps } from '@toptal/picasso-shared'
import { styled } from '@mui/material/styles'

import { PropTypeDocumentation } from '~/.storybook/utils/documentation-generator'
import cx from 'classnames'

const Enums = styled('div')(() => ({
  marginTop: '1em',
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
}))

const EnumLabel = styled('strong')(() => ({
  marginRight: '0.2em',
  marginBottom: '0.2em',
}))

const PREFIX = 'PicassoEnumsList'

const classes = {
  highlight: `${PREFIX}-highlight`,
  enum: `${PREFIX}-enum`,
}

const EnumValue = styled('span')(() => ({
  [`& .${classes.highlight}`]: {
    backgroundColor: 'rgb(236, 236, 236, 0.5)',
    borderRadius: '0.4em',
    padding: '0.3em 0.7em',
    fontWeight: 600,
  },
  [`& .${classes.enum}`]: {
    fontSize: '0.8rem',
    marginRight: '0.2em',
    marginBottom: '0.2em',
  },
}))

interface Props extends BaseProps {
  enums?: string[]
  type: string | PropTypeDocumentation
}

const trim = (value: string) => String(value).replace(/\'|\"/gi, '')

const EnumsList: FunctionComponent<Props> = props => {
  const { enums, type } = props

  let enumList = enums

  if (!Array.isArray(enums)) {
    if (Array.isArray((type as PropTypeDocumentation).enums)) {
      enumList = (type as PropTypeDocumentation).enums
    }
  }

  if (!Array.isArray(enumList)) return null

  return (
    <Enums>
      <EnumLabel>Enums:</EnumLabel>

      {enumList.map(enumValue => (
        <EnumValue
          key={enumValue}
          className={cx(classes.highlight, classes.enum)}
        >
          {trim(enumValue)}
        </EnumValue>
      ))}
    </Enums>
  )
}

EnumsList.displayName = 'EnumsList'

export default EnumsList
