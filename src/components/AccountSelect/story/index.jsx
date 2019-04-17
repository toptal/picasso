import PicassoBook from '~/.storybook/components/PicassoBook'

import { AccountSelect } from '../AccountSelect'

const page = PicassoBook.createPage('AccountSelect', null, 'Widgets')

page
  .addComponentDocs(AccountSelect, {
    accounts: {
      name: 'accounts',
      type: {
        name: '[]',
        description:
          '{ id: string, href?: string, name: string, position: string, avatar?: string }'
      }
    }
  })
  .addExample('AccountSelect/story/Default.example.jsx', 'Default')
  .addExample('AccountSelect/story/Page.example.jsx', 'Select Account Page')
