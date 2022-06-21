import { AccountSelect } from '../AccountSelect'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Widgets').createPage('AccountSelect', null)

page.createTabChapter('Props').addComponentDocs({
  component: AccountSelect,
  additionalDocs: {
    accounts: {
      name: 'accounts',
      type: {
        name: '[]',
        description: `
{\n
  id: string\n
  href?: string\n
  name: string\n
  position: string\n
  avatar?: string\n
}
        `,
      },
    },
  },
})

page
  .createChapter()
  .addExample('AccountSelect/story/Default.example.tsx', 'Default')
  .addExample('AccountSelect/story/Page.example.tsx', 'Select Account Page')
