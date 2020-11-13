import SubmitButton from '../SubmitButton'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Picasso Forms').createPage(
  'SubmitButton',
  'SubmitButton'
)

page.createTabChapter('Props').addComponentDocs({
  component: SubmitButton,
  name: 'SubmitButton',
  description: 'SubmitButton reacts to the submission state of the form.'
})

page
  .createChapter()
  .addExample('SubmitButton/story/Default.example.tsx', 'Default')
  .addExample('SubmitButton/story/ButtonTypes.example.tsx', 'Button types')
