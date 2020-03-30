import { Tab } from '../Tab'

import PicassoBook from '~/.storybook/components/PicassoBook'

const componentDocs = PicassoBook.createComponentDocs(Tab, 'Tabs.Tab')

const chapter = PicassoBook.connectToPage(page => {
  page
    .createChapter('Tabs.Tab')
    .addExample('Tab/story/Disabled.example.jsx', 'Disabled tab')
    .addExample('Tab/story/CustomValue.example.jsx', 'Using custom value')
    .addExample('Tab/story/Icon.example.jsx', 'With Icon')
})

export default {
  chapter,
  componentDocs
}
