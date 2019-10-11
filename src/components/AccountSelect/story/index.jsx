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
        description: `
{\n
  id: string\n
  href?: string\n
  name: string\n
  position: string\n
  avatar?: string\n
}
        `
      }
    }
  }
})

page
  .createChapter()
  .addExample('AccountSelect/story/Default.example.jsx', 'Default', {
    waitUntilImagesLoaded: true
  })
  .addExample('AccountSelect/story/Page.example.jsx', 'Select Account Page', {
    waitUntilImagesLoaded: true
  })
