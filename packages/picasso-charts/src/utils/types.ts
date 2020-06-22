export type CoordinatePayload = {
  activeCoordinate: { x: number; y: number }
  activeLabel: number
  activePayload: object[]
  activeTooltipIndex: number
  chartX: number
  chartY: number
  isTooltipActive: boolean
}

export type PositionTranslate = {
  key: 'x' | 'y'
  cursorCoordinate: number
  chartScreenOffset: number
  tooltipDimension: number
  screenDimension: number
  offset: number
  viewbox: { x: number; y: number }
}
