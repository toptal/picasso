import PicassoBook from '../../../.storybook/components/PicassoBook'
import { Timesheets } from '../Timesheets'

const page = PicassoBook.createPage(
  'Timesheets',
  `If the Job has hourly commitment Timesheets component is showing the 
  timesheets for the work done by the talent.`,
  'Widgets'
)

page
  .addComponentDocs(Timesheets)
  .addExample('Timesheets/story/Default.example.jsx', 'Default')
  .addExample('Timesheets/story/ShowMore.example.jsx', 'Show more')
