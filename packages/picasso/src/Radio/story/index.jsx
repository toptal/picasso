import radioGroupStory from '../../RadioGroup/story'
import { Radio } from '../Radio'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Forms').createPage(
  'Radio',
  `Radio buttons are best used when users need to select a single option from a set of unfamiliar choices. 
    Radio buttons surface all the options and allow the user to compare choices before making a selection.`
)

page
  .createTabChapter('Props')
  .addComponentDocs({
    component: Radio,
    name: 'Radio',
    additionalDocs: {
      onChange: {
        type: {
          description:
            '(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void'
        }
      }
    }
  })
  .addComponentDocs(radioGroupStory.componentDocs)

page
  .createChapter()
  .addExample('Radio/story/Default.example.tsx', {
    title: 'Default',
    effect: async (testPage, makeScreenshot) => {
      await testPage.hover('[data-testid="trigger"]')
      await makeScreenshot()

      // Move mouse out not to combine hover and focus
      await testPage.mouse.move(0, 0)

      await testPage.keyboard.press('Tab')
      await makeScreenshot()
    }
  })
  .addExample('Radio/story/Checked.example.tsx', 'Checked')
  .addExample('Radio/story/Disabled.example.tsx', 'Disabled')
  .addExample(
    'Radio/story/RadioGroupVertical.example.tsx',
    'Radio group vertical'
  )
  .addExample(
    'Radio/story/RadioGroupHorizontal.example.tsx',
    'Radio group horizontal'
  )
  .addExample('Radio/story/CustomLabel.example.tsx', 'Custom label')
