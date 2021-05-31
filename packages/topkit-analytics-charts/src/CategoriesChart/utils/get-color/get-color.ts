import { palette } from '@toptal/picasso/utils'

const DEFAULT_COLORS = [palette.blue.main, palette.blue.darker]

const COLORS: Record<string, string[]> = {
  bad_leads: [palette.red.main, palette.red.main],
  paused: [palette.yellow.main, palette.yellow.main],
  removed: [palette.green.main, palette.green.main],
  collections: [palette.red.main, palette.red.main],
  pending: [palette.yellow.main, palette.yellow.main]
}

const BAD_RESULT_COLOR = palette.red.main

const getColor = ({
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

export default getColor
