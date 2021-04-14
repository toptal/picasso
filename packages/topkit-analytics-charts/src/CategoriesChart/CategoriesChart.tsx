import React, { useMemo } from 'react'
import { Paper, Container, Typography } from '@toptal/picasso'
import { BarChartProps, BarChart } from '@toptal/picasso-charts'
import { palette } from '@toptal/picasso/utils'

export type ChartGranularity = 'month' | 'week' | 'day' | 'hour'

type Value = {
  id: string
  value: number
}

export type Bar = {
  id: string
  values: [
    {
      id: string
      values: Value[]
    },
    {
      id: string
      values: Value[]
    }
  ]
}

export type Labels = Record<string, string>

export type Tooltips = Record<string, Record<string, Record<string, string>>>

const DEFAULT_COLORS = [palette.blue.main, palette.blue.darker]

const COLORS: Record<string, string[]> = {
  bad_leads: [palette.red.main, palette.red.main],
  paused: [palette.yellow.main, palette.yellow.main],
  removed: [palette.green.main, palette.green.main],
  collections: [palette.red.main, palette.red.main],
  pending: [palette.yellow.main, palette.yellow.main]
}

const COLOR_FOR_BAD_RESULT = palette.red.main

const sum = (values: number[]) =>
  values.reduce((total, value) => total + value, 0)

export type Props = Pick<BarChartProps<string>, 'width' | 'height'> & {
  data: Bar[]
  labels: Labels
  tooltips: Tooltips
}

const formatData = (data: Bar[], labels: Labels) => {
  return data.map(({ id, values }) => {
    const [team, user] = values

    const sumTeam = sum(team.values.map(({ value }) => value))
    const sumUser = sum(user.values.map(({ value }) => value))

    return {
      name: id,
      label: labels[id],
      value: {
        team: sumTeam,
        user: sumUser
      }
    }
  })
}

const getBarColor = (
  dataKey: string,
  entry: { name: string; value: { team: number; user: number } }
) => {
  if (dataKey === 'team') {
    return COLORS[entry.name]?.[0] || DEFAULT_COLORS[0]
  }

  if (entry.value.team > entry.value.user && entry.name !== 'claimed') {
    return COLOR_FOR_BAD_RESULT
  }

  return COLORS[entry.name]?.[1] || DEFAULT_COLORS[1]
}

const CustomTooltip = ({
  active,
  payload,
  tooltips
}: {
  active: boolean
  payload: { payload: { name: string; team: number; user: number } }[]
  tooltips: Tooltips
}) => {
  if (active && payload && payload.length > 0) {
    const { team, user } = payload[0].payload

    const id = payload[0].payload.name
    const teamLabel = tooltips[id].team[id] || tooltips[id].team.viable
    const userLabel = tooltips[id].user[id] || tooltips[id].user.viable

    return (
      <Paper data-testid='tooltip'>
        <Container padded='xsmall'>
          <Typography size='medium' color='blue'>
            {teamLabel}: {team}
          </Typography>

          <Typography size='medium' color={team > user ? 'red' : 'dark-grey'}>
            {userLabel}: {user}
          </Typography>
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
      customTooltip={<CustomTooltip tooltips={tooltips} />}
      getBarColor={getBarColor}
      {...restProps}
    />
  )
}

CategoriesChart.defaultProps = {}

CategoriesChart.displayName = 'CategoriesChart'

export default CategoriesChart
