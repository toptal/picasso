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
    effect: async (testPage, makeScreenshot) => {
      const hideInputCaretStyle = `
        input {
          caret-color: transparent !important;
        }
      `

      await testPage.addStyleTag({ content: hideInputCaretStyle })

      await testPage.click('[role="combobox"]')
      await makeScreenshot({
        isFullScreen: true
      })

      await testPage.keyboard.press('Enter')
      await testPage.waitFor(50)
      await makeScreenshot()

      await testPage.click('[aria-label="delete icon"]')
      await testPage.waitFor(100)
      await makeScreenshot()

      await testPage.type('input', 'test')
      await testPage.waitFor(50)
      await makeScreenshot({
        isFullScreen: true
      })
    }
  })
  .addExample('lab/TagSelector/story/OtherOption.example.jsx', 'Other option', {
    effect: async (testPage, makeScreenshot) => {
      await testPage.click('[role="combobox"]')

      await testPage.type('input', 'test')
      await testPage.waitFor(50)
      await makeScreenshot({
        isFullScreen: true
      })

      await testPage.click('[role="option"]')
      await testPage.waitFor(50)
      await makeScreenshot()
    }
  })
  .addExample(
    'lab/TagSelector/story/InitialSetValue.example.jsx',
    'Initially set value'
  )
  .addExample('lab/TagSelector/story/Loading.example.jsx', 'Loading')
