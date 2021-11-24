import React, { FC } from 'react'
import { Paper, Container, Typography } from '@toptal/picasso'

import { DataItem, TooltipMap } from '../CategoriesChart/types'
import { getDisplayTexts } from './utils'

export type Props = {
  active: boolean
  payload: { payload: { name: string; team: number; user: number } }[]
  tooltips: TooltipMap
  originalData: DataItem[]
  testIds?: {
    paper?: string
  }
}

const CategoriesChartTooltip: FC<Props> = ({
  active,
  payload,
  tooltips,
  originalData,
  testIds
}) => {
  if (active && payload && payload.length > 0) {
    const currentData = originalData.find(
      ({ id: dataId }) => dataId === payload[0].payload.name
    )

    if (!currentData) {
      return null
    }

    const { teamTexts, userTexts } = getDisplayTexts({
      currentData,
      tooltips,
      currentPayload: payload[0].payload
    })

    return (
      <Paper data-testid={testIds?.paper}>
        <Container padded='xsmall'>
          {teamTexts.map(({ key, label, value, color }) => (
            <Typography size='medium' style={{ color }} key={key}>
              {label}: {value}
            </Typography>
          ))}

          {userTexts.map(({ key, label, value, color }) => (
            <Typography size='medium' style={{ color }} key={key}>
              {label}: {value}
            </Typography>
          ))}
        </Container>
      </Paper>
    )
  }

  return null
}

export default CategoriesChartTooltip
