/* global page */
import path from 'path'
const PADDING_AROUND_COMPONENT = 8

async function screenshotDOMElement () {
  const dimensions = await page.evaluate(() => {
    const component = document.querySelector('#root > *')

    const componentRect = component.getBoundingClientRect()

    return {
      x: componentRect.x,
      y: componentRect.y,
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
export const assertVisuals = function (kind, type) {
  return async () => {
    const url = `file:${path.join(
      __dirname,
      `../build/storybook/iframe.html?selectedKind=${kind}&selectedStory=${type}`
    )}`

    await page.goto(url)

    const image = await screenshotDOMElement()

    expect(image).toMatchImageSnapshot({
      customSnapshotIdentifier: `${kind}-${type}`
    })
  }
}
