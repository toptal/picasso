import { Indicator } from '../Indicator'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Components').createPage(
  'Indicator',
  `${PicassoBook.createSourceLink(__filename)}`
)

page.createTabChapter('Props').addComponentDocs({
  component: Indicator,
  name: 'Indicator',
  additionalDocs: {
    color: {
      name: 'color',
      type: {
        name: 'enum',
        enums: ['"red"', '"yellow"', '"blue"', '"green"', '"light-grey"'],
      },
      description: 'Indicator color',
    },
  },
})

page
  .createChapter()
  .addExample('Indicator/story/Default.example.tsx', 'Default')
