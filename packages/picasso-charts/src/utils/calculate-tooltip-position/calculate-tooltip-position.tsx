import debounce from 'debounce'

import CHART_CONSTANTS from '../constants'

const {
  SCROLL_BAR_WIDTH,
  TOOLTIP_OFFSET,
  DEFAULT_MARGIN,
  Y_AXIS_WIDTH
} = CHART_CONSTANTS

export type CoordinatePayload = {
  activeCoordinate: { x: number; y: number }
  activeLabel: number
  activePayload: object[]
  activeTooltipIndex: number
  chartX: number
  chartY: number
  isTooltipActive: boolean
}

export const chartMargins = {
  top: DEFAULT_MARGIN,
  right: DEFAULT_MARGIN,
  bottom: DEFAULT_MARGIN,
  left: 0
}

const chartViewbox = {
  x: chartMargins.left + Y_AXIS_WIDTH,
  y: chartMargins.top
}

const getTooltipTranslate = ({
  key,
  cursorCoordinate,
  chartScreenOffset,
  tooltipDimension,
  screenDimension,
  offset,
  viewbox
}: {
  key: 'x' | 'y'
  cursorCoordinate: number
  chartScreenOffset: number
  tooltipDimension: number
  screenDimension: number
  offset: number
  viewbox: { x: number; y: number }
}) => {
  const restricted = cursorCoordinate - tooltipDimension - offset
  const unrestricted = cursorCoordinate + offset
  const tooltipBoundary =
    chartScreenOffset +
    cursorCoordinate +
    tooltipDimension +
    offset +
    SCROLL_BAR_WIDTH

  const screenBoundary = screenDimension

  if (tooltipBoundary > screenBoundary) {
    const isInsideScreen = restricted + chartScreenOffset >= 0

    return isInsideScreen ? restricted : viewbox[key]
  }
  return unrestricted
}

const calculateTooltipPosition = debounce(
  async (
    payload: CoordinatePayload,
    tooltipElem: HTMLDivElement | null,
    chartElem: HTMLDivElement | null
  ) => {
    const nextX = payload.activeCoordinate?.x
    const nextY = payload.chartY

    // const tooltipElem = getTooltipElement()
    // const chartElem = getChartElement()

    if (!tooltipElem || !chartElem) {
      return
    }
    const chartBoundary = chartElem.getBoundingClientRect()

    const translationX = getTooltipTranslate({
      key: 'x',
      cursorCoordinate: nextX,
      chartScreenOffset: chartBoundary.x,
      tooltipDimension: tooltipElem.clientWidth,
      screenDimension: window.innerWidth,
      offset: TOOLTIP_OFFSET,
      viewbox: chartViewbox
    })

    const translationY = getTooltipTranslate({
      key: 'y',
      cursorCoordinate: nextY,
      chartScreenOffset: chartBoundary.y,
      tooltipDimension: tooltipElem.clientHeight,
      screenDimension: window.innerHeight,
      offset: TOOLTIP_OFFSET,
      viewbox: chartViewbox
    })

    const translateQuery = `translate(${translationX}px, ${translationY}px)`
    tooltipElem.style.transform = translateQuery
  },
  15
)

export default calculateTooltipPosition
