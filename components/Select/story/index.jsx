import PicassoBook from '../../../.storybook/components/PicassoBook'

const page = PicassoBook.createPage(
  'Select',
  `Selects are interactive elements that prompt users to make selections 
  or take actions from a set of list of available options.`
)

page.addExample('Select/story/Default-example.jsx', 'Default')
page.addExample('Select/story/Types-example.jsx', 'Types')
page.addExample('Select/story/WithLabel-example.jsx', 'With label')
page.addExample('Select/story/Disabled-example.jsx', 'Disabled')
page.addExample('Select/story/FullWidth-example.jsx', 'Full width')
page.addExample('Select/story/ChosenOption-example.jsx', {
  title: 'Chosen option',
  description: 'Renders Select component with already chosen one of the options'
})
page.addExample('Select/story/CustomOptions-example.jsx', {
  title: 'Custom options',
  description:
    'Options of the Select component could be not only text, but custom components'
})
