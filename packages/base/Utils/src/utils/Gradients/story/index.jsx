import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Utils').createPage(
  'Gradients',
  `Gradients are important visual elements. They are versatile and can be combined with other elements. To keep our visual language consistent it's important to make a correct use of our gradients. 
  
  These are the recommended gradients.
  
  Our gradients are made using our brand colors, always keeping a 200 points interval. For example: Blue 500 to Blue 700.`
)

page
  .createChapter()
  .addExample('utils/Gradients/story/HowToUse.example.tsx', {
    title: 'How to use',
    takeScreenshot: false,
  })
  .addExample('utils/Gradients/story/Default.example.tsx', 'Gradients')
