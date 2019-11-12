import PicassoBook from '~/.storybook/components/PicassoBook'

import { TagSelector } from '../TagSelector'

const page = PicassoBook.createPage(
  'TagSelector',
  'Input that allows multiselection from a list of available options with autocomplete. Based on Autocomplete component.'
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: TagSelector, name: 'TagSelector' })

page
  .createChapter()
  .addExample('TagSelector/story/Default.example.jsx', 'Default', {
    effect: async (page, makeScreenshot) => {
      const hideInputCaretStyle = `
        input {
          caret-color: transparent !important;
        }
      `

      await page.addStyleTag({ content: hideInputCaretStyle })

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
  .addExample('TagSelector/story/OtherOption.example.jsx', 'Other option', {
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
    'TagSelector/story/InitialSetValue.example.jsx',
    'Initially set value'
  )
  .addExample('TagSelector/story/Loading.example.jsx', 'Loading')
