import { TagSelector } from '../TagSelector'
import PicassoBook from '~/.storybook/components/PicassoBook'
import tagSelectorLabelStory from '../../TagSelectorLabel/story'

const page = PicassoBook.section('Forms').createPage(
  'TagSelector',
  'Input that allows multiselection from a list of available options with autocomplete. Based on Autocomplete component.'
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: TagSelector, name: 'TagSelector' })
  .addComponentDocs(tagSelectorLabelStory.componentDocs)

page
  .createChapter()
  .addExample('TagSelector/story/Default.example.tsx', {
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
  .addExample('TagSelector/story/OtherOption.example.tsx', {
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
    'TagSelector/story/InitialSetValue.example.tsx',
    'Initially set value'
  )
  .addExample(
    'TagSelector/story/CustomOptionRenderer.example.tsx',
    'Custom option rendering'
  )
  .addExample(
    'TagSelector/story/CustomLabelRenderer.example.tsx',
    'Custom label rendering'
  )
  .addExample('TagSelector/story/Loading.example.tsx', 'Loading')
  .addExample('TagSelector/story/Disabled.example.tsx', 'Disabled')
  .addExample('TagSelector/story/FullWidth.example.tsx', 'Full width')
