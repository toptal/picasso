import PicassoBook from '~/.storybook/components/PicassoBook'

import { Select } from '../Select'

const page = PicassoBook.createPage(
  'Select',
  `Selects are interactive elements that prompt users to make selections 
  or take actions from a set of list of available options.`,
  'Forms'
)

page.createTabChapter('Props').addComponentDocs({
  component: Select,
  name: 'Select',
  additionalDocs: {
    options: {
      type: {
        description: '{ value: string, text: string }: Option'
      }
    }
  }
})

page
  .createChapter()
  .addExample('Select/story/Default.example.jsx', 'Default')
  .addExample('Select/story/Native.example.jsx', 'Native')
  .addExample('Select/story/Disabled.example.jsx', 'Disabled')
  .addExample('Select/story/Error.example.jsx', 'Error')
  .addExample('Select/story/WithIcon.example.jsx', 'With Icon')
  .addExample('Select/story/FullWidth.example.jsx', 'Full width')
  .addExample('Select/story/ShrinkWidth.example.jsx', 'Shrink width')
  .addExample('Select/story/ChosenOption.example.jsx', {
    title: 'Chosen option',
    description:
      'Renders Select component with already chosen one of the options'
  })
  .addExample('Select/story/CustomOptions.example.jsx', {
    title: 'Custom options',
    description:
      'Options of the Select component could be not only text, but custom components'
  })
