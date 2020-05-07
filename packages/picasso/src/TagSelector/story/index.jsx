import { TagSelector } from '../TagSelector'

import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Forms').createPage(
  'TagSelector',
  'Input that allows multiselection from a list of available options with autocomplete. Based on Autocomplete component.'
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: TagSelector, name: 'TagSelector' })

page
  .createChapter()
  .addExample('TagSelector/story/Default.example.jsx', {
    title: 'Default',
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
      await testPage.keyboard.press('ArrowDown')
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
  .addExample('TagSelector/story/OtherOption.example.jsx', {
    title: 'Other option',
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
    'TagSelector/story/InitialSetValue.example.jsx',
    'Initially set value'
  )
  .addExample(
    'TagSelector/story/CustomOptionRenderer.example.tsx',
    'Custom option rendering'
  )
  .addExample('TagSelector/story/Loading.example.jsx', 'Loading')
  .addExample('TagSelector/story/FullWidth.example.jsx', 'Full width')
