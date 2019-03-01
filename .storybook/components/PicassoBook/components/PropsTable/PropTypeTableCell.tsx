import React from 'react'
import _ from 'lodash'

import TableCell from '@material-ui/core/TableCell'
import Tooltip from '@material-ui/core/Tooltip'

import { PropTypeDocumentation } from '../../../../utils/documentationGenerator'

interface Props {
  type: string | PropTypeDocumentation
}

const PropTypeTableCell: React.FunctionComponent<Props> = props => {
  const { type } = props

  if (_.isString(type)) {
    return <TableCell>{type}</TableCell>
  }

  return (
    <TableCell>
      <Tooltip title={type.description}>
        <span>{type.name}</span>
      </Tooltip>
    </TableCell>
  )
}

export default PropTypeTableCell
