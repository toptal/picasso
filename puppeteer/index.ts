/* eslint-disable no-console */

import { MatchImageSnapshotOptions } from 'jest-image-snapshot'

const PADDING_AROUND_COMPONENT = 8

const screenshotDOMElement = async (
  chromium: any,
  kind: string,
  type: string
) => {
  const measure = (kind: string, type: string) => {
    const normalize = (name: string) =>
      name
        .replace(/[^\w]+/gi, '-')
        .trim()
        .toLowerCase()

    const selector = `[data-story-id=${normalize(kind)}-${normalize(type)}]`
    const component = document.querySelector(selector)

    console.time(`Locating ${selector} 1`)

    if (!component) {
      throw new Error(
        `Rendered story ${kind} for ${type} ${selector} was not found!`
      )
    }
    console.timeEnd(`Locating ${selector} 1`)

    const componentRect: ClientRect = component!.getBoundingClientRect()

    return {
      x: componentRect.left,
      y: componentRect.top,
      width: componentRect.width,
      height: componentRect.height
    }
  }

  const dimensions = await chromium.evaluate(measure, kind, type)

  console.time('Take screenshot')
  const image = await chromium.screenshot({
    clip: {
      x: dimensions.x - PADDING_AROUND_COMPONENT,
      y: dimensions.y - PADDING_AROUND_COMPONENT,
      width: dimensions.width + PADDING_AROUND_COMPONENT * 2,
      height: dimensions.height + PADDING_AROUND_COMPONENT * 2
    },
    type: 'png'
  })

  console.timeEnd('Take screenshot')
  return image
}

// TODO: Make this more universal when we add more components and their variations
export const assertVisuals = function (
  chromium: any,
  kind: string,
  type: string,
  options: MatchImageSnapshotOptions
) {
  return async () => {
    console.time(`Evaluating ${kind}:${type}`)
    const image = await screenshotDOMElement(chromium, kind, type)

    console.timeEnd(`Evaluating ${kind}:${type}`)

    expect(image).toMatchImageSnapshot(options)
  }
}
