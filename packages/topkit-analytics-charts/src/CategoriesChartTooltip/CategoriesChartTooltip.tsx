import React from 'react'
import { Paper, Container, Typography } from '@toptal/picasso'

import { Bar, Tooltips } from '../CategoriesChart/types'

const CategoriesChartTooltip = ({
  active,
  payload,
  tooltips,
  originalData
}: {
  active: boolean
  payload: { payload: { name: string; team: number; user: number } }[]
  tooltips: Tooltips
  originalData: Bar[]
}) => {
  if (active && payload && payload.length > 0) {
    const { team, user } = payload[0].payload

    const id = payload[0].payload.name

    const currentOriginalData = originalData.find(
      ({ id: dataId }) => dataId === id
    )?.values

    if (!currentOriginalData) {
      return null
    }

    const [
      { values: originalTeamValues },
      { values: originalUserValues }
    ] = currentOriginalData

    return (
      <Paper data-testid='tooltip'>
        <Container padded='xsmall'>
          {originalTeamValues
            .filter(({ value }) => !!value)
            .map(({ id: teamValueId, value }) => (
              <Typography
                size='medium'
                color='blue'
                key={`team-${teamValueId}`}
              >
                {tooltips[id].team[teamValueId]}: {value}
              </Typography>
            ))}

          {originalUserValues
            .filter(({ value }) => !!value)
            .map(({ id: userValueId, value }) => (
              <Typography
                size='medium'
                color={team > user ? 'red' : 'dark-grey'}
                key={`user-${userValueId}`}
              >
                {tooltips[id].user[userValueId]}: {value}
              </Typography>
            ))}
        </Container>
      </Paper>
    )
  }

  return null
}

export default CategoriesChartTooltip
