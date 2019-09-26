import { join } from 'path'
import { Page } from 'puppeteer'

import { generateIframeUrl } from '../src/utils/url-generator'

declare var page: Page

const PADDING_AROUND_COMPONENT = 8

async function screenshotDOMElement() {
  const dimensions = await page.evaluate(() => {
    const component = document.querySelector('#root .chapter-container')

    if (!component) {
      throw new Error(`Rendered story was not found!`)
    }
    const componentRect: ClientRect = component!.getBoundingClientRect()

    return {
      x: componentRect.left,
      y: componentRect.top,
      width: componentRect.width,
      height: componentRect.height
    }
  })

  return page.screenshot({
    clip: {
      x: dimensions.x - PADDING_AROUND_COMPONENT,
      y: dimensions.y - PADDING_AROUND_COMPONENT,
      width: dimensions.width + PADDING_AROUND_COMPONENT * 2,
      height: dimensions.height + PADDING_AROUND_COMPONENT * 2
    }
  })
}

// TODO: Make this more universal when we add more components and their variations
export const assertVisuals = function (
  kind: string,
  type: string,
  options = { delay: 0 }
) {
  return async () => {
    // eslint-disable-next-line no-console
    console.time(`Test: ${kind} ${type}`)
    const { delay, ..._opts } = options
    const host = `file:///${join(__dirname, '/../build/storybook/')}`
    const url = generateIframeUrl({ host, kind, type })

    await page.goto(url, { waitUntil: 'networkidle0' })
    await page.waitFor(delay || 0)

    // eslint-disable-next-line no-console
    console.time('take screenshot')
    const image = await screenshotDOMElement()

    // eslint-disable-next-line no-console
    console.timeEnd('take screenshot')

    // eslint-disable-next-line no-console
    console.time('match screenshot')
    expect(image).toMatchImageSnapshot(_opts)
    // eslint-disable-next-line no-console
    console.timeEnd('match screenshot')
    // eslint-disable-next-line no-console
    console.timeEnd(`Test: ${kind} ${type}`)
  }
}
