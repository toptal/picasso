import PicassoBook from '~/.storybook/components/PicassoBook'

import { Indicator } from '../Indicator'

const page = PicassoBook.createPage('Indicator')

page.createTabChapter('Props').addComponentDocs({
  component: Indicator,
  name: 'Indicator',
  additionalDocs: {
    color: {
      name: 'color',
      type: {
        name: 'enum',
        enums: ['"red"', '"yellow"', '"blue"']
      },
      description: 'Indicator color'
    }
  }
})

page
  .createChapter()
  .addExample('Indicator/story/Default.example.jsx', 'Default')
