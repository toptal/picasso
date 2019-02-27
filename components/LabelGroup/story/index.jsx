import PicassoBook from '../../../.storybook/components/PicassoBook'

const page = PicassoBook.lookupPage('Label')

const docs = [
  {
    name: 'children',
    type: 'node',
    description: 'Pass Label components that you want to use inside the group'
  }
]

page
  .createChapter(
    'Group of labels',
    'You can combine different variants and styles of the Label by using <Label.Group /> component'
  )
  .addDocs(docs)
  .addExample('LabelGroup/story/LabelGroup.example.jsx', 'Label group')
