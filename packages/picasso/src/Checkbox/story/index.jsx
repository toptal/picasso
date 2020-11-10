import { Checkbox } from '../Checkbox'
import checkboxGroupStory from '../../CheckboxGroup/story'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Forms').createPage('Checkbox', null)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: Checkbox, name: 'Checkbox' })
  .addComponentDocs(checkboxGroupStory.componentDocs)

page
  .createChapter()
  .addExample('Checkbox/story/Uncontrolled.example.jsx', {
    title: 'Uncontrolled',
    description: 'Can control its state by itself'
  })
  .addExample('Checkbox/story/Controlled.example.jsx', {
    title: 'Controlled',
    description: 'Stateless checkbox, state should be controlled using prop',
    effect: async (testPage, makeScreenshot) => {
      await testPage.hover('#checkbox-unchecked')
      await makeScreenshot()

      await testPage.hover('#checkbox-checked')
      await makeScreenshot()

      // Move mouse out not to combine hover and focus
      await testPage.mouse.move(0, 0)

      // Unchecked focused
      await testPage.keyboard.press('Tab')
      await makeScreenshot()

      // Checked focused
      await testPage.keyboard.press('Tab')
      await makeScreenshot()
    }
  })
  .addExample(
    'Checkbox/story/CheckboxGroupVertical.example.jsx',
    'Checkbox group vertical'
  )
  .addExample(
    'Checkbox/story/CheckboxGroupHorizontal.example.jsx',
    'Checkbox group horizontal'
  )
  .addExample('Checkbox/story/Disabled.example.jsx', 'Disabled')
  .addExample('Checkbox/story/Indeterminate.example.jsx', {
    title: 'Indeterminate'
  })
  .addExample('Checkbox/story/Required.example.jsx', 'Required')
  .addExample('Checkbox/story/CustomLabel.example.tsx', 'Custom label')
