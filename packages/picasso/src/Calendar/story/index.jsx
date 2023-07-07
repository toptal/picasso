import { Calendar } from '../Calendar'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Components').createPage(
  'Calendar',
  `Container for displaying data in calendar form. See even more use cases in [DatePicker](/?path=/story/forms-datepicker--datepicker).


  ${PicassoBook.createSourceLink(__filename)}
  `
)

page.createTabChapter('Props').addComponentDocs({
  component: Calendar,
  name: 'Calendar',
})

page.createChapter().addExample('Calendar/story/Default.example.tsx', 'Default')
