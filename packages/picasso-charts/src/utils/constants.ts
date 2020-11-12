const chartConstants = {
  BOTTOM_DOMAIN: 0,
  HIGHLIGHT_BOTTOM_START_POINT: 0,
  HIGHLIGHT_BOTTOM_FILL_OPACITY: 0.1,
  HIGHLIGHT_TOP_FILL_OPACITY: 0.1,
  HIGHLIGHT_TOP_HEIGHT_RATIO: 0.02,
  TOP_DOMAIN_OFFSET: 1,
  TICK_MARGIN: 16,
  MIN_TICK_GAP: -10,
  DEFAULT_MARGIN: 16,
  TICK_LINE: false,
  AXIS_LINE: false,
  IS_ANIMATION_ACTIVE: false,
  Y_AXIS_WIDTH: 60,
  TOOLTIP_OFFSET: 10,
  SCROLL_BAR_WIDTH: 16,
  // Taken from https://github.com/toptal/platform/blob/aa7f30b28b2a913381b4ac17f88bdd709efa0117/app/assets/features/platform/analytics/js/components/charts/views/date_chart.js#L282
  NUMBER_OF_TICKS: 4
}

export const chartMargins = {
  top: chartConstants.DEFAULT_MARGIN,
  right: chartConstants.DEFAULT_MARGIN,
  bottom: chartConstants.DEFAULT_MARGIN,
  left: 0
}

export default chartConstants
