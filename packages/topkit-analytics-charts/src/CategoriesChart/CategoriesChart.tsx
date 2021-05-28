import React, { useMemo } from 'react'
import { Paper, Container, Typography } from '@toptal/picasso'
import { BarChartProps, BarChart } from '@toptal/picasso-charts'
import { palette } from '@toptal/picasso/utils'

import { Bar, Labels, Tooltips } from './types'
import { formatData } from './utils'

const DEFAULT_COLORS = [palette.blue.main, palette.blue.darker]

const COLORS: Record<string, string[]> = {
  bad_leads: [palette.red.main, palette.red.main],
  paused: [palette.yellow.main, palette.yellow.main],
  removed: [palette.green.main, palette.green.main],
  collections: [palette.red.main, palette.red.main],
  pending: [palette.yellow.main, palette.yellow.main]
}

const BAD_RESULT_COLOR = palette.red.main

export type Props = Pick<BarChartProps<string>, 'width' | 'height'> & {
  data: Bar[]
  labels: Labels
  tooltips: Tooltips
}

const getBarColor = ({
  dataKey,
  entry
}: {
  dataKey: string
  entry?: { name: string; value: { team: number; user: number } }
}) => {
  if (!entry) {
    return DEFAULT_COLORS[0]
  }

  if (dataKey === 'team') {
    return COLORS[entry.name]?.[0] || DEFAULT_COLORS[0]
  }

  if (entry.value.team > entry.value.user && entry.name !== 'claimed') {
    return BAD_RESULT_COLOR
  }

  return COLORS[entry.name]?.[1] || DEFAULT_COLORS[1]
}

const CustomTooltip = ({
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

export const CategoriesChart = ({
  data,
  labels,
  tooltips,
  ...restProps
}: Props) => {
  const chartData = useMemo(() => formatData(data, labels), [data, labels])

  const getBarLabelColor = ({
    index,
    dataKey
  }: {
    index?: number
    dataKey: string
  }) => {
    if (index === undefined) {
      return palette.grey.dark
    }

    const { team, user } = chartData[index].value

    if (dataKey === 'team') {
      return palette.grey.dark
    }

    return user < team ? palette.red.main : palette.grey.dark
  }

  return (
    <BarChart
      labelKey='label'
      data={chartData}
      tooltip
      getBarLabelColor={getBarLabelColor}
      // @ts-expect-error: There is some magic in recharts that adding the props for us
      customTooltip={<CustomTooltip originalData={data} tooltips={tooltips} />}
      getBarColor={getBarColor}
      {...restProps}
    />
  )
}

CategoriesChart.defaultProps = {}

CategoriesChart.displayName = 'CategoriesChart'

export default CategoriesChart
