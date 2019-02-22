import PicassoBook from '../../../.storybook/components/PicassoBook'

const page = PicassoBook.createPage('Button')

page
  .addExample('Button/story/Basic-example.jsx', 'Basic')
  .addExample('Button/story/Variants-example.jsx', 'Variants')
  .addExample('Button/story/States-example.jsx', 'States')
  .addExample('Button/story/Disabled-example.jsx', {
    title: 'Disabled',
    description: 'The button shows that currently unable to be interacted with'
  })
  .addExample('Button/story/Sizes-example.jsx', 'Sizes')
  .addExample('Button/story/FullWidth-example.jsx', 'Full width')
  .addExample('Button/story/IconButtons-example.jsx', 'Button with Icon')
  .addExample(
    'Button/story/IconButtonsWithText-example.jsx',
    'Button with text and Icon'
  )
  .addExample('Button/story/Loading-example.jsx', 'Button with loading state')
