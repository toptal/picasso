import Select from '../Select'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Forms').createPage(
  'Select',
  `Selects are interactive elements that prompt users to make selections
    or take actions from a set of list of available options.`
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
        `
      }
    },
    multiple: {
      type: {
        name: 'boolean'
      }
    }
  }
})

page
  .createChapter()
  .addExample('Select/story/Default.example.tsx', 'Default') // picasso-skip-visuals
  .addExample('Select/story/Native.example.tsx', 'Native') // picasso-skip-visuals
  .addExample('Select/story/SearchBehavior.example.tsx', {
    title: 'Search behavior',
    description:
      'Search is enabled when the number of options is greater or equal to `searchThreshold`.' +
      'Additionally you can control how many items should be displayed in the search result setting `maxSearchItems`'
  }) // picasso-skip-visuals
  .addExample('Select/story/Disabled.example.tsx', 'Disabled') // picasso-skip-visuals
  .addExample('Select/story/Error.example.tsx', 'Error') // picasso-skip-visuals
  .addExample('Select/story/WithIcon.example.tsx', 'With icon') // picasso-skip-visuals
  .addExample('Select/story/WithDescription.example.tsx', 'With description') // picasso-skip-visuals
  .addExample('Select/story/Loading.example.tsx', 'Loading') // picasso-skip-visuals
  .addExample('Select/story/Sizes.example.tsx', 'Sizes') // picasso-skip-visuals
  .addExample('Select/story/FullWidth.example.tsx', 'Full width') // picasso-skip-visuals
  .addExample('Select/story/ShrinkWidth.example.tsx', 'Shrink width') // picasso-skip-visuals
  .addExample('Select/story/MenuWidth.example.tsx', 'Custom menu width') // picasso-skip-visuals
  .addExample('Select/story/ChosenOption.example.tsx', {
    title: 'Chosen option',
    description:
      'Renders Select component with already chosen one of the options'
  }) // picasso-skip-visuals
  .addExample('Select/story/CustomOptions.example.tsx', {
    title: 'Custom options',
    description:
      'Options of the Select component could be not only text, but custom components'
  }) // picasso-skip-visuals
  .addExample('Select/story/CustomDisplayValue.example.tsx', {
    title: 'Custom display value',
    description: 'Display value of selected value in input can be customized'
  }) // picasso-skip-visuals
  .addExample('Select/story/Multiple.example.tsx', {
    title: 'Multiple options',
    description: 'Select component allows to select multiple options'
  }) // picasso-skip-visuals
  .addExample('Select/story/Grouped.example.tsx', {
    title: 'Grouped options',
    description: 'Select component allows to define grouped options'
  }) // picasso-skip-visuals
  .addExample('Select/story/AutoFocus.example.tsx', {
    title: 'Auto focus',
    description:
      'Demonstrate auto focus capability by switching visibility of Select'
  }) // picasso-skip-visuals
  .addExample('Select/story/ResetButton.example.tsx', 'With reset button') // picasso-skip-visuals
  .addExample('Select/story/Autofill.example.tsx', 'Disable autofilling') // picasso-skip-visuals
