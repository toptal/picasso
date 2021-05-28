import CategoriesChart from '../CategoriesChart'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Picasso Charts').createPage(
  'CategoriesChart',
  'Use BarChart with analytics data'
)

page.createTabChapter('Props').addComponentDocs({
  component: CategoriesChart,
  name: 'CategoriesChart',
  additionalDocs: Object.assign(
    {},
    {
      data: {
        name: 'data',
        type: {
          name: '[]',
          description: `{
          id: string
          values: [
            {
              id: 'team'
              values: Value[]
            },
            {
              id: 'user'
              values: Value[]
            }
          ]
        }`
        },
        description: 'A record of kipper data to be rendered as a bar chart',
        required: true
      },
      labels: {
        name: 'labels',
        type: {
          name: '{}',
          description: `Record<string, string>`
        },
        description: 'A record of labels from kipper data',
        required: true
      },
      tooltips: {
        name: 'tooltips',
        type: {
          name: '{}',
          description: 'Record<string, Record<string, Record<string, string>>>'
        },
        description: 'A record of tooltips data from kipper data',
        required: true
      }
    }
  )
})

page.createChapter().addExample('CategoriesChart/story/Default.example.tsx', {
  title: 'Default',
  delay: 500
})
