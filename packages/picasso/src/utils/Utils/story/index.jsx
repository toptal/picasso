import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Utils').createPage('Utils')

page
  .createChapter()
  .addExample('utils/Utils/story/Generic.example.tsx', {
    title: 'Generic',
    showEditCode: false,
    takeScreenshot: false
  }) // picasso-skip-visuals
  .addExample('utils/Utils/story/Strings.example.tsx', {
    title: 'Strings',
    showEditCode: false,
    takeScreenshot: false
  }) // picasso-skip-visuals
  .addExample('utils/Utils/story/Browser.example.tsx', {
    title: 'Browser',
    showEditCode: false,
    takeScreenshot: false
  }) // picasso-skip-visuals
  .addExample('utils/Utils/story/React.example.tsx', {
    title: 'React',
    showEditCode: false,
    takeScreenshot: false
  }) // picasso-skip-visuals
  .addExample('utils/Utils/story/Colors.example.tsx', {
    title: 'Colors',
    showEditCode: false,
    takeScreenshot: false
  }) // picasso-skip-visuals
