import React, { FunctionComponent } from 'react'

import { withStyles } from '@material-ui/core/styles'
import { ClassNameMap } from '@material-ui/core/styles/withStyles'

import { Tooltip, Table } from '@toptal/picasso'
import Markdown from '~/.storybook/components/Markdown'
import { PropTypeDocumentation } from '~/.storybook/utils/documentation-generator'
import styles from './styles'

interface Props {
  className?: string
  classes: Partial<ClassNameMap<string>>
  type: string | PropTypeDocumentation
}

const PropTypeTableCell: FunctionComponent<Props> = props => {
  const { type, className, classes } = props

  if (typeof type === 'string') {
    return <Table.Cell>{type}</Table.Cell>
  }

  if (type.description) {
    return (
      <Table.Cell className={className}>
        <Tooltip content={<Markdown>{type.description}</Markdown>} interactive>
          <div>
            <span className={classes.tooltipTarget}>{type.name}</span>
            <sup>?</sup>
          </div>
        </Tooltip>
      </Table.Cell>
    )
  }

  return (
    <Table.Cell className={className}>
      <span>{type.name}</span>
    </Table.Cell>
  )
}

PropTypeTableCell.displayName = 'PropTypeTableCell'

export default withStyles(styles)(PropTypeTableCell)
