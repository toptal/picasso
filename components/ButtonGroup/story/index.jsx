import PicassoBook from '../../../.storybook/components/PicassoBook'

const page = PicassoBook.lookupPage('Button')

const docs = [
  {
    name: 'children',
    type: 'node',
    description: 'Pass Button components that you want to use inside the group'
  }
]

page
  .createChapter(
    'Group of buttons',
    'You can combine multiple buttons into a single container.'
  )
  .addDocs(docs)
  .addExample('ButtonGroup/story/ButtonGroup.example.jsx', 'Button group')
