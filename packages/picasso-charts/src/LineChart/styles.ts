/**
 * Marker class applied to the chart root to hide the bottom-most Y axis tick
 * label. It scopes the matching rule in `LineChart`'s `<style>` overrides to a
 * single chart instance (replaces the former JSS `hideBottomYAxisLabel`
 * parent-ref rule).
 */
export const HIDE_BOTTOM_Y_AXIS_LABEL_CLASS =
  'picasso-charts-hide-bottom-y-axis-label'
