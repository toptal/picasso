import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Forms').createPage(
  'FormActionsContainer',
  `
    Aligns form actions according to chosen form layout (vertical or horizontal).

    ${PicassoBook.createSourceLink(__filename)}
  `
)

page
  .createChapter()
  .addExample('FormActionsContainer/story/Default.example.tsx', 'Default')
