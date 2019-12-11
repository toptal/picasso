import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.createPage('Page', `A Page component`, 'Layout')

page
  .createChapter()
  .addExample('Page/story/Scroll.example.jsx', 'Scroll with overflow')
