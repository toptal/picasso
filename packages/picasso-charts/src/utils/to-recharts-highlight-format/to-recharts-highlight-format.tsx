import { HighlightData } from '../..'
import CHART_CONSTANTS from '../constants'

const {
  HIGHLIGHT_BOTTOM_START_POINT,
  HIGHLIGHT_BOTTOM_FILL_OPACITY,
  HIGHLIGHT_TOP_HEIGHT,
  HIGHLIGHT_TOP_FILL_OPACITY
} = CHART_CONSTANTS

const toRechartsHighlightFormat = (topDomain: number, data: HighlightData[]) =>
  data.map(({ from, to, color }) => {
    const x1 = from
    const x2 = to
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
        y1: topDomain - HIGHLIGHT_TOP_HEIGHT,
        y2: topDomain,
        fillOpacity: HIGHLIGHT_TOP_FILL_OPACITY,
        fill: color
      }
    ]
  })

export default toRechartsHighlightFormat
