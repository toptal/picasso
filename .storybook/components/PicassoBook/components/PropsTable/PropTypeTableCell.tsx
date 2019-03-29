import React from 'react'
import _ from 'lodash'

import { withStyles } from '@material-ui/core/styles'
import TableCell from '@material-ui/core/TableCell'
import Tooltip from '../../../../../components/Tooltip'
import { ClassNameMap } from '@material-ui/core/styles/withStyles'

import styles from './styles'
import Markdown from '../../../Markdown'
import { PropTypeDocumentation } from '../../../../utils/documentationGenerator'

interface Props {
  className?: string
  classes: Partial<ClassNameMap<string>>
  type: string | PropTypeDocumentation
}

const PropTypeTableCell: React.FunctionComponent<Props> = props => {
  const { type, className, classes } = props

  if (_.isString(type)) {
    return <TableCell>{type}</TableCell>
  }

  if (type.description) {
    return (
      <TableCell className={className}>
        <Tooltip
          content={<Markdown>{type.description}</Markdown>}
          classes={{ tooltip: classes.tooltip }}
        >
          <div>
            <span className={classes.tooltipTarget}>{type.name}</span>
            <sup>?</sup>
          </div>
        </Tooltip>
      </TableCell>
    )
  }

  return (
    <TableCell className={className}>
      <span>{type.name}</span>
    </TableCell>
  )
}

export default withStyles(styles)(PropTypeTableCell)
