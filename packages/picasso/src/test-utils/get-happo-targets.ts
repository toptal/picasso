type Result = Record<string, any>

/**
 * Generates Happo targets for responsive visual tests
 *
 * @param screenWidths Screen widths to generate targets for
 * @returns {Result} Object with Happo targets
 */
export const getHappoTargets = (screenWidths: number[]) =>
  screenWidths.reduce<Result>((acc: Result, width: number) => {
    const name = `chrome-desktop-width-${width}`

    acc[name] = {
      name,
      browser: 'chrome',
      viewport: `${width}x1024`,
    }

    return acc
  }, {})
