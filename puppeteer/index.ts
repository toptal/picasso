import { join } from 'path'
import { Page } from 'puppeteer'
import { MatchImageSnapshotOptions } from 'jest-image-snapshot'

import { generateIframeUrl } from '../src/utils/url-generator'

declare const page: Page

const PADDING_AROUND_COMPONENT = 8

interface Dimensions {
  x: number
  y: number
  width: number
  height: number
}

interface Options extends MatchImageSnapshotOptions {
  delay?: number
  waitUntilImagesLoaded?: boolean
  effect?: (
    page: Page,
    makeScreenShot: (options: Options) => void
  ) => Promise<unknown>
  isFullScreen?: boolean
  padding?: number
  dimensions?: Partial<Dimensions>
  selector?: string
}

const screenshotDOMElement = async ({
  isFullScreen,
  padding,
  dimensions,
  selector = '#root .chapter-container'
}: Options) => {
  if (isFullScreen) {
    return page.screenshot()
  }

  const componentDimensions: Dimensions = await page.evaluate(
    componentSelector => {
      const component = document.querySelector(componentSelector)

      if (!component) {
        throw new Error('Rendered story was not found!')
      }
      const componentRect: ClientRect = component.getBoundingClientRect()

      return {
        x: componentRect.left,
        y: componentRect.top,
        width: componentRect.width,
        height: componentRect.height
      }
    },
    selector
  )

  const clipDimensions = {
    ...componentDimensions,
    ...dimensions
  }

  const clipPadding = padding || PADDING_AROUND_COMPONENT

  return page.screenshot({
    clip: {
      x: clipDimensions.x - clipPadding,
      y: clipDimensions.y - clipPadding,
      width: clipDimensions.width + clipPadding * 2,
      height: clipDimensions.height + clipPadding * 2
    }
  })
}

const matchScreenshot = async (options: Options) => {
  const image = await screenshotDOMElement(options)

  expect(image).toMatchImageSnapshot(options)
}

// TODO: Make this more universal when we add more components and their variations
export const assertVisuals = (
  kind: string,
  type: string,
  options: Options = {
    delay: 0,
    waitUntilImagesLoaded: false,
    effect: undefined
  }
) => {
  return async () => {
    const {
      delay = 0,
      waitUntilImagesLoaded,
      effect,
      customSnapshotIdentifier
    } = options
    const host = `file:///${join(__dirname, '/../build/storybook/')}`
    const url = generateIframeUrl({ host, kind, type })

    await page.goto(
      url,
      waitUntilImagesLoaded ? { waitUntil: 'networkidle0' } : {}
    )
    await page.waitFor(delay)

    await matchScreenshot(options)

    if (effect) {
      let effectSnapshotId = 0

      const makeEffectScreenshot = async (effectOptions: Options) => {
        await matchScreenshot({
          ...options,
          ...effectOptions,
          customSnapshotIdentifier: `${customSnapshotIdentifier}-effect-${++effectSnapshotId}`
        })
      }

      await effect(page, makeEffectScreenshot)
    }
  }
}
