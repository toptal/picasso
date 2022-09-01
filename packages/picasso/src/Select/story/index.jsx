import Select from '../Select'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Forms').createPage(
  'Select',
  `Selects are interactive elements that prompt users to make selections
    or take actions from a set of list of available options.
    
  ${PicassoBook.createSourceLink(__filename)}
    `
)

page.createTabChapter('Props').addComponentDocs({
  component: Select,
  name: 'Select',
  additionalDocs: {
    options: {
      type: {
        name: 'Option[] | OptionGroups',
        description: `
    [\n
      { text: string, value: string },\n
      { text: string, value: string }\n
    }\n
or\n
    {\n
      string: [\n
        { text: string, value: string },\n
        { text: string, value: string }\n
      ],\n
      string: [\n
        { text: string, value: string },\n
        { text: string, value: string }\n
      ]\n
    }
        `,
      },
    },
    multiple: {
      type: {
        name: 'boolean',
      },
    },
  },
})

page
  .createChapter()
  .addExample('Select/story/Default.example.tsx', 'Default')
  .addExample('Select/story/Native.example.tsx', {
    title: 'Native',
    takeScreenshot: false,
  })
  .addExample('Select/story/SearchBehavior.example.tsx', {
    title: 'Search behavior',
    description: `Search is enabled when the number of options is greater or equal to \`searchThreshold\`.
      ⚠️ When used in Drawer, we need to use \`disablePortal\` to enable the mouse focus of the search input.`,
    takeScreenshot: false,
  })
  .addExample('Select/story/Limit.example.tsx', {
    title: 'Limit',
    description:
      'Maximum number of options on the list can be controlled through `limit` property',
    takeScreenshot: false,
  })
  .addExample('Select/story/Disabled.example.tsx', 'Disabled')
  .addExample('Select/story/Status.example.tsx', {
    title: 'Status',
  })
  .addExample('Select/story/WithIcon.example.tsx', 'With icon')
  .addExample('Select/story/WithDescription.example.tsx', {
    title: 'With description',
    takeScreenshot: false,
  })
  .addExample('Select/story/Loading.example.tsx', {
    title: 'Loading',
    takeScreenshot: false,
  })
  .addExample('Select/story/Sizes.example.tsx', 'Sizes')
  .addExample('Select/story/FullWidth.example.tsx', 'Full width')
  .addExample('Select/story/ShrinkWidth.example.tsx', 'Shrink width')
  .addExample('Select/story/MenuWidth.example.tsx', {
    title: 'Custom menu width',
    takeScreenshot: false,
  })
  .addExample('Select/story/ChosenOption.example.tsx', {
    title: 'Chosen option',
    description:
      'Renders Select component with already chosen one of the options',
  })
  .addExample('Select/story/CustomOptions.example.tsx', {
    title: 'Custom options',
    description:
      'Options of the Select component could be not only text, but custom components',
    takeScreenshot: false,
  })
  .addExample('Select/story/CustomDisplayValue.example.tsx', {
    title: 'Custom display value',
    description: 'Display value of selected value in input can be customized',
    takeScreenshot: false,
  })
  .addExample('Select/story/Multiple.example.tsx', {
    title: 'Multiple options',
    description: 'Select component allows to select multiple options',
    takeScreenshot: false,
  })
  .addExample('Select/story/Grouped.example.tsx', {
    title: 'Grouped options',
    description: 'Select component allows to define grouped options',
    takeScreenshot: false,
  })
  .addExample('Select/story/AutoFocus.example.tsx', {
    title: 'Auto focus',
    description:
      'Demonstrate auto focus capability by switching visibility of Select',
    takeScreenshot: false,
  })
  .addExample('Select/story/ResetButton.example.tsx', {
    title: 'With reset button',
    takeScreenshot: false,
  })
  .addExample('Select/story/Autofill.example.tsx', {
    title: 'Disable autofilling',
    takeScreenshot: false,
  })
