import PicassoBook from '../../../.storybook/components/PicassoBook'
import { Select } from '../Select'

const page = PicassoBook.createPage(
  'Select',
  `Selects are interactive elements that prompt users to make selections 
  or take actions from a set of list of available options.`
)

page
  .addComponentDocs(Select, {
    options: {
      type: {
        description: '{ value: string, text: string }: Option'
      }
    },
    label: {
      type: {
        description:
          "Please note that the usage of label is exclusive and can't be used when placeholder is specified"
      }
    },
    placeholder: {
      type: {
        description:
          "Please note that the usage of placeholder is exclusive and can't be used when label is specified"
      }
    }
  })
  .addExample('Select/story/Default.example.jsx', 'Default')
  .addExample('Select/story/Types.example.jsx', 'Types')
  .addExample('Select/story/WithLabel.example.jsx', 'With label')
  .addExample('Select/story/Disabled.example.jsx', 'Disabled')
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
