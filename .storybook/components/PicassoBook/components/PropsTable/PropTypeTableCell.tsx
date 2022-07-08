import React, { FunctionComponent } from 'react'
import { styled } from '@mui/material/styles'

import { Tooltip, Table } from '@toptal/picasso'
import { BaseProps } from '@toptal/picasso-shared'

import Markdown from '~/.storybook/components/Markdown'
import { PropTypeDocumentation } from '~/.storybook/utils/documentation-generator'
import styles from './styles'

interface Props extends BaseProps {
  className?: string
  type: string | PropTypeDocumentation
}

const TooltipTarget = styled('span')(() => ({
  borderBottom: '1px dotted',
  fontWeight: 600,
  cursor: 'help',
}))

const PropTypeTableCell: FunctionComponent<Props> = props => {
  const { type, className } = props

  if (typeof type === 'string') {
    return <Table.Cell>{type}</Table.Cell>
  }

  if (type.description) {
    return (
      <Table.Cell className={className}>
        <Tooltip content={<Markdown>{type.description}</Markdown>} interactive>
          <div>
            <TooltipTarget>{type.name}</TooltipTarget>
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
