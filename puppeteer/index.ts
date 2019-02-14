import { join } from 'path'
import { Page } from 'puppeteer'

declare var page: Page

const PADDING_AROUND_COMPONENT = 8

async function screenshotDOMElement () {
  const dimensions = await page.evaluate(() => {
    const component = document.querySelector('#root div > *')
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
export const assertVisuals = function (kind: any, type: any, delay = 0) {
  return async () => {
    const encodedType = encodeURI(type)
    const path = join(
      __dirname,
      '/../' +
        `build/storybook/iframe.html?selectedKind=${kind}&selectedStory=${encodedType}`
    )

    const url = `file:///${path}`

    await page.goto(url, { waitUntil: 'networkidle0' })
    await page.waitFor(delay)

    const image = await screenshotDOMElement()

    expect(image).toMatchImageSnapshot()
  }
}
