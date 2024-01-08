import { PicassoBreakpoints } from '@toptal/picasso-provider'

/**
 * Produces an array of checkpoints – screen size values, needed for covering
 * all existing breakpoints in tests (checkpoints are different from breakpoints
 * by certain offset).
 *
 * @returns {number[]} Array of checkpoints
 */
export const getCheckpoints = () => {
  const offset = 1
  const breakpointValues = Object.values(
    PicassoBreakpoints.breakpoints.values
  ).sort((valueA, valueB) => valueA - valueB)

  return [
    ...breakpointValues
      // Skip the first breakpoint as it equals to 0
      .slice(1)
      // Genereate checkpoints by subtsracting offset from each breakpoint
      .map(breakpointValue => breakpointValue - offset),
    // Add the last checkpoint that covers screens wider that the last breakpoint
    breakpointValues[breakpointValues.length - 1] + offset,
  ]
}
