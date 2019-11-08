import PicassoBook from '~/.storybook/components/PicassoBook'

import { TagSelector } from '../TagSelector'

const page = PicassoBook.createPage(
  'TagSelector',
  'Input that allows multiselection from a list of available options with autocomplete. Based on Autocomplete component.',
  'Lab'
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: TagSelector, name: 'TagSelector' })

page
  .createChapter()
  .addExample('lab/TagSelector/story/Default.example.jsx', 'Default', {
    effect: async (page, makeScreenshot) => {
      await page.click('[role="combobox"]')
      await makeScreenshot({
        isFullScreen: true
      })

      await page.keyboard.press('Enter')
      await page.waitFor(50)
      await makeScreenshot()

      await page.click('[aria-label="delete icon"]')
      await page.waitFor(100)
      await makeScreenshot()

      await page.type('input', 'test')
      await page.waitFor(50)
      await makeScreenshot({
        isFullScreen: true
      })
    }
  })
  .addExample('lab/TagSelector/story/OtherOption.example.jsx', 'Other option', {
    effect: async (page, makeScreenshot) => {
      await page.click('[role="combobox"]')

      await page.type('input', 'test')
      await page.waitFor(50)
      await makeScreenshot({
        isFullScreen: true
      })

      await page.click('[role="option"]')
      await page.waitFor(50)
      await makeScreenshot()
    }
  })
  .addExample(
    'lab/TagSelector/story/InitialSetValue.example.jsx',
    'Initially set value'
  )
  .addExample('lab/TagSelector/story/Loading.example.jsx', 'Loading')
