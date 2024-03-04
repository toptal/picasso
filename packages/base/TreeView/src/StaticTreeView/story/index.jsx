import StaticTreeView from '../StaticTreeView'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Components').createPage(
  'StaticTreeView',
  `Allows rendering a static variant of tree view

   ${PicassoBook.createSourceLink(__filename)}
  `
)

const waitForImageToLoad = url => {
  return new Promise((resolve, reject) => {
    const img = new Image()

    img.onerror = () =>
      reject(new Error(`Failed to load image with url ${url}`))
    img.onload = resolve
    img.src = url
  })
}

const waitForSvgImagesToRender = () => {
  return new Promise((resolve, reject) => {
    const svgImages = document.querySelectorAll('svg image')
    const promises = [...svgImages]
      .map(image => image.href)
      .filter(Boolean)
      .map(waitForImageToLoad)

    if (promises.length === 0) {
      // There are no images to wait for, so we can just resolve right away.
      resolve()
    }

    Promise.all(promises)
      .then(() => {
        // Now that the images have loaded, we need to wait for a couple of
        // animation frames to go by before we think they will have finished
        // rendering.
        return requestAnimationFrame(() => {
          // Start render
          requestAnimationFrame(() => {
            // Finish rendering
            resolve()
          })
        })
      })
      .catch(reject)
  })
}

page.createTabChapter('Props').addComponentDocs({
  component: StaticTreeView,
  name: 'StaticTreeView',
})

page
  .createChapter()
  .addExample(
    'StaticTreeView/story/Default.example.tsx',
    {
      title: 'Default',
      takeScreenshot: {
        beforeScreenshot: async () => {
          await waitForSvgImagesToRender()
        },
      },
    },
    'base/TreeView'
  )
  .addExample(
    'StaticTreeView/story/Horizontal.example.tsx',
    {
      title: 'Horizontal Direction',
    },
    'base/TreeView'
  )
  .addExample(
    'StaticTreeView/story/Compact.example.tsx',
    {
      title: 'Compact tree',
      description:
        'Example of a compact tree - one with only single node on each depth that has children',
    },
    'base/TreeView'
  )
