import { Tab } from '../Tab'
import PicassoBook from '~/.storybook/components/PicassoBook'

const componentDocs = PicassoBook.createComponentDocs(Tab, 'Tabs.Tab')

const chapter = PicassoBook.connectToPage(page => {
  page
    .createChapter('Tabs.Tab')
    .addExample('Tab/story/Disabled.example.tsx', {
      title: 'Disabled tab',
      takeScreenshot: false,
    })
    .addExample('Tab/story/CustomValue.example.tsx', {
      title: 'Using custom value',
      takeScreenshot: false,
    })
    .addExample('Tab/story/Icon.example.tsx', {
      title: 'With Icon',
      takeScreenshot: false,
    })
})

export default {
  chapter,
  componentDocs,
}
