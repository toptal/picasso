import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Forms').createPage(
  'Select',
  `Selects are interactive elements that prompt users to make selections
    or take actions from a set of list of available options.`
)

page.createChapter().addExample('Select/story/SearchBehavior.example.tsx', {
  title: 'Example for issue 1521',
  description: `I want the selct below to always have a value, 
    Click the field,
    Press Backspace
    Click outside
    Field will not show a value`
}) // picasso-skip-visuals
