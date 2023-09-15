import PicassoBook from '~/.storybook/components/PicassoBook'
import QueryBuilder from '../QueryBuilder'

const page = PicassoBook.section('Picasso Query Builder').createPage(
  'QueryBuilder'
)

page.createTabChapter('Props').addComponentDocs({
  component: QueryBuilder,
  name: 'QueryBuilder',
})

page
  .createChapter()
  .addExample('QueryBuilder/story/Default.example.tsx', 'Default')

  .addExample('QueryBuilder/story/DynamicMultiselect.example.tsx', {
    title: 'ValueEditor with Async Values',
    takeScreenshot: false,
  })

  .addExample('QueryBuilder/story/RuleValidation.example.tsx', {
    title: 'Validation on Rule Level',
    takeScreenshot: false,
  })

  .addExample('QueryBuilder/story/QueryValidation.example.tsx', {
    title: 'Validation on Query Level',
    takeScreenshot: false,
  })

  .addExample('QueryBuilder/story/CustomOperators.example.tsx', {
    title: 'Custom Operators',
    takeScreenshot: false,
  })
