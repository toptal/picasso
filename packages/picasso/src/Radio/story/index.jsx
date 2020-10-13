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

const hover = testPage => testPage.hover('[data-testid="trigger"]')
const mouseOut = testPage => testPage.mouse.move(0, 0)
const focus = testPage => testPage.keyboard.press('Tab')

page
  .createChapter()
  .addExample('Radio/story/Default.example.jsx', {
    title: 'Default',
    effect: async (testPage, makeScreenshot) => {
      await hover(testPage)
      await makeScreenshot()
      await mouseOut(testPage)
      await focus(testPage)
      await makeScreenshot()
    }
  })
  .addExample('Radio/story/Disabled.example.jsx', 'Disabled')
  .addExample(
    'Radio/story/RadioGroupVertical.example.jsx',
    'Radio group vertical'
  )
  .addExample(
    'Radio/story/RadioGroupHorizontal.example.jsx',
    'Radio group horizontal'
  )
  .addExample('Radio/story/CustomLabel.example.jsx', 'Custom label')
