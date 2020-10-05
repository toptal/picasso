import { HighlightConfig } from '../../LineChart'
import CHART_CONSTANTS from '../constants'

const {
  HIGHLIGHT_BOTTOM_START_POINT,
  HIGHLIGHT_BOTTOM_FILL_OPACITY,
  HIGHLIGHT_TOP_HEIGHT_RATIO,
  HIGHLIGHT_TOP_FILL_OPACITY
} = CHART_CONSTANTS

const OFFSET = 0.5

const toRechartsHighlightFormat = (
  topDomain: number,
  dataPointCount: number,
  data: HighlightConfig[]
) =>
  data.map(({ from, to, color }) => {
    const isFromFirstPoint = from === 0
    const x1 = isFromFirstPoint ? 0 : from - OFFSET

    const isToLastPoint = to > dataPointCount
    const x2 = isToLastPoint ? dataPointCount : to - 0.5

    return [
      {
        x1,
        x2,
        y1: HIGHLIGHT_BOTTOM_START_POINT,
        y2: topDomain,
        fillOpacity: HIGHLIGHT_BOTTOM_FILL_OPACITY,
        fill: color
      },
      {
        x1,
        x2,
        y1: topDomain - topDomain * HIGHLIGHT_TOP_HEIGHT_RATIO,
        y2: topDomain,
        fillOpacity: HIGHLIGHT_TOP_FILL_OPACITY,
        fill: color
      }
    ]
  })

export default toRechartsHighlightFormat
