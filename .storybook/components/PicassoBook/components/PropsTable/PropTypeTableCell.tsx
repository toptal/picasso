import React from 'react'

import { makeStyles, Theme } from '@material-ui/core/styles'

import { Tooltip, Table } from '@toptal/picasso'
import { BaseProps } from '@toptal/picasso-shared'

import Markdown from '~/.storybook/components/Markdown'
import { PropTypeDocumentation } from '~/.storybook/utils/documentation-generator'
import styles from './styles'

interface Props extends BaseProps {
  className?: string
  type: string | PropTypeDocumentation
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoPropTypeTableCell'
})

const PropTypeTableCell = (props: Props) => {
  const classes = useStyles()

  const { type, className } = props

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

export default PropTypeTableCell
