import { join } from 'path'
import { Page } from 'puppeteer'

import { normalize } from './utils'

declare var page: Page

const PADDING_AROUND_COMPONENT = 8

async function screenshotDOMElement (kind: string, type: string) {
  const dimensions = await page.evaluate(() => {
    const component = document.querySelector('#root .chapter-container')

    if (!component) {
      throw new Error(
        `Rendered story ${type} for component ${kind} was not found!`
      )
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
    const { delay, ..._opts } = options
    const encodedKind = normalize(kind)
    const encodedType = normalize(type)
    const path = join(
      __dirname,
      '/../' + `build/storybook/iframe.html?id=${encodedKind}--${encodedType}`
    )

    const url = `file:///${path}`

    await page.goto(url)
    await page.waitFor(delay || 0)

    const image = await screenshotDOMElement(kind, type)

    expect(image).toMatchImageSnapshot(_opts)
  }
}
