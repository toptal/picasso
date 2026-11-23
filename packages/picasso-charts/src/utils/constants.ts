const chartConstants = {
  BOTTOM_DOMAIN: 0,
  HIGHLIGHT_BOTTOM_START_POINT: 0,
  HIGHLIGHT_BOTTOM_FILL_OPACITY: 0.1,
  HIGHLIGHT_TOP_FILL_OPACITY: 0.1,
  HIGHLIGHT_TOP_HEIGHT_RATIO: 0.02,
  TOP_DOMAIN_OFFSET: 1,
  TICK_MARGIN: 16,
  TICK_WIDTH: 100,
  TICK_HEIGHT: 50,
  MIN_TICK_GAP: -10,
  DEFAULT_MARGIN: 16,
  TICK_LINE: false,
  AXIS_LINE: false,
  IS_ANIMATION_ACTIVE: false,
  Y_AXIS_WIDTH: 60,
  TOOLTIP_OFFSET: 10,
  SCROLL_BAR_WIDTH: 16,
  NUMBER_OF_TICKS: 4,
}

// lets labels and indicators near the edges render outside the svg box
export const SURFACE_OVERFLOW_VISIBLE = '[&>.recharts-surface]:overflow-visible'

// FOCUS_RING.blue.focusVisible on the svg, which the chart wrapper renders
export const SURFACE_FOCUS_RING =
  '[&>.recharts-surface]:outline-none [&>.recharts-surface:focus-visible]:shadow-[0_0_0_0.1875rem_color-mix(in_srgb,theme(colors.blue.500)_48%,transparent)]'

export const chartMargins = {
  top: chartConstants.DEFAULT_MARGIN,
  right: chartConstants.DEFAULT_MARGIN,
  bottom: chartConstants.DEFAULT_MARGIN,
  left: 0,
}

export default chartConstants
