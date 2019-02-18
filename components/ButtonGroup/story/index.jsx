import PicassoBook from '../../../.storybook/components/PicasoBook'

const page = PicassoBook.lookupPage('Button')

page
  .createChapter(
    'Group of buttons',
    'You can combine multiple buttons into a single container.'
  )
  .addExample('ButtonGroup/story/ButtonGroup-example.jsx', 'Button group')
