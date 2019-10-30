import { join } from 'path'
import { Page } from 'puppeteer'
import { isFullString } from 'is-what'
import { MatchImageSnapshotOptions } from 'jest-image-snapshot'

import { generateIframeUrl } from '../src/utils/url-generator'

declare var page: Page

const PADDING_AROUND_COMPONENT = 8

interface Options extends MatchImageSnapshotOptions {
  delay?: number
  waitUntilImagesLoaded?: boolean
  effect?: (page: Page) => Promise<any>
  isFullScreen?: boolean
}

async function screenshotDOMElement(
  options: Options = { isFullScreen: false }
) {
  if (isFullString) {
    return page.screenshot()
  }

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
export const assertVisuals = function(
  kind: string,
  type: string,
  options: Options = {
    delay: 0,
    waitUntilImagesLoaded: false,
    effect: undefined
  }
) {
  return async () => {
    const { delay, waitUntilImagesLoaded, effect, ..._opts } = options
    const host = `file:///${join(__dirname, '/../build/storybook/')}`
    const url = generateIframeUrl({ host, kind, type })

    console.log('control')

    await page.goto(
      url,
      waitUntilImagesLoaded ? { waitUntil: 'networkidle0' } : {}
    )
    await page.waitFor(delay || 0)

    const image = await screenshotDOMElement(options)

    expect(image).toMatchImageSnapshot(_opts)

    if (effect) {
      console.log('################: ', effect)
      // @ts-ignore
      await effect(page)

      const image_after_effect = await screenshotDOMElement(options)

      expect(image_after_effect).toMatchImageSnapshot({
        ..._opts,
        // @ts-ignore
        customSnapshotIdentifier: `${_opts.customSnapshotIdentifier}-after`
      })
    }

    /* const [button] = await page.$x('//span')
    if (button) {
      console.log('BUTON: ', button)
      await button.click()
    } */

    // await page.click('span')

    // const image = await screenshotDOMElement()

    // expect(image).toMatchImageSnapshot(_opts)
  }
}
