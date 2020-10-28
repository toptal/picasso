import debounce from 'debounce'

import CHART_CONSTANTS, { chartMargins } from '../constants'
import { CoordinatePayload, PositionTranslate } from '../types'

const { SCROLL_BAR_WIDTH, TOOLTIP_OFFSET, Y_AXIS_WIDTH } = CHART_CONSTANTS

const chartViewbox = {
  x: chartMargins.left + Y_AXIS_WIDTH,
  y: chartMargins.top
}

export const getTooltipTranslate = ({
  key,
  cursorCoordinate,
  chartScreenOffset,
  tooltipDimension,
  screenDimension,
  offset,
  viewbox
}: PositionTranslate) => {
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

export const calculateTooltipPosition = debounce(
  (
    payload: CoordinatePayload,
    tooltipElem: HTMLDivElement | null,
    chartElem: HTMLDivElement | null
  ) => {
    const nextX = payload.activeCoordinate?.x
    const nextY = payload.chartY

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
