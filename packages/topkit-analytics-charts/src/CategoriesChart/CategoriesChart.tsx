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
  entry: { value: { team: number; user: number } }
) => {
  if (dataKey === 'team') {
    return palette.blue.main
  }

  if (entry.value.team > entry.value.user) {
    return palette.red.main
  }

  return palette.blue.darker
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

          <Typography size='medium' color={team > user ? 'red' : 'blue'}>
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

  return (
    <BarChart
      labelKey='label'
      data={chartData}
      tooltip
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
