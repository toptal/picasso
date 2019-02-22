import PicassoBook from '../../../.storybook/components/PicassoBook'

const page = PicassoBook.lookupPage('Label')

page
  .createChapter(
    'Group of labels',
    'You can combine different variants and styles of the Label inside the group.'
  )
  .addExample('LabelGroup/story/LabelGroup-example.jsx', 'Label group')
