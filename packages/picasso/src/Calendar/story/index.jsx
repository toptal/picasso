/** 
 * In July 2023 we tried to expose the Calendar component. It turned out there was no Calendar designs in BASE.
 * Since noone needed it at the time, we decided to 1) pospone the work on stand alone Calendar 2) hide it back to discourage its usage.
 * When the work is resumed - just uncomment the code below and work from there. Also check out PR #3729 where we refactored Calendar to remove its Container and footer.
 * 
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

page
  .createChapter()
  .addExample('Calendar/story/Default.example.tsx', 'Default')
  .addExample(
    'Calendar/story/WithSelectableDaysLimit.example.tsx',
    'With selectable days limit'
  )
  .addExample('Calendar/story/Range.example.tsx', 'Range')
  .addExample('Calendar/story/WithCustomDayRendering.example.tsx', {
    title: 'With custom day rendering',
    description: 'Hover over the days to see a tooltip',
    takeScreenshot: false,
  })
  .addExample(
    'Calendar/story/WithDisabledIntervals.example.tsx',
    'With disabled intervals'
  )
  .addExample(
    'Calendar/story/WithIndicatedIntervals.example.tsx',
    'With indicated intervals'
  )
  .addExample('Calendar/story/WithTwoMonths.example.tsx', 'With two months')
  .addExample('Calendar/story/WithWeekStartsOnSunday.example.tsx', {
    title: 'With week starts on Sunday',
    description:
      'Calendars that start on Sunday, which you’ll more often see in the US, use an old-fashioned notation based on Christianity. Which makes the day that Christians go to church the first day of the week.',
  })
*/
