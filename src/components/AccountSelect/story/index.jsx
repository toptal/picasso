import PicassoBook from '~/.storybook/components/PicassoBook'

import { AccountSelect } from '../AccountSelect'

const page = PicassoBook.createPage('AccountSelect', null, 'Widgets')

page.createTabChapter('Props').addComponentDocs({
  component: AccountSelect,
  additionalDocs: {
    accounts: {
      name: 'accounts',
      type: {
        name: '[]',
        description:
          '{ id: string, href?: string, name: string, position: string, avatar?: string }'
      }
    }
  }
})

page
  .createChapter()
  .addExample('AccountSelect/story/Default.example.jsx', 'Default')
  .addExample('AccountSelect/story/Page.example.jsx', 'Select Account Page')
