type HappoTarget = {
  name: string
  browser: string
  viewport: string
  width: number
}

/**
 * Generates Happo targets for responsive visual tests
 *
 * @param screenWidths Screen widths to generate targets for
 * @returns {Result} Object with Happo targets
 */
export const getHappoTargets = (checkpoints: number[]): HappoTarget[] =>
  checkpoints.map((width: number) => ({
    width,
    name: `chrome-desktop-width-${width}`,
    browser: 'chrome',
    viewport: `${width}x1024`,
  }))
