import PicassoBook from '../../../.storybook/components/PicasoBook'

const page = PicassoBook.createPage('Checkbox')

page
  .addExample('Checkbox/story/Uncontrolled-example.jsx', {
    title: 'Uncontrolled',
    description: 'Can control its state by itself'
  })
  .addExample('Checkbox/story/Controlled-example.jsx', {
    title: 'Controlled',
    description: 'Stateless checkbox, state should be controlled using prop'
  })
  .addExample('Checkbox/story/Disabled-example.jsx', 'Disabled')
  .addExample('Checkbox/story/Indeterminate-example.jsx', 'Indeterminate')
