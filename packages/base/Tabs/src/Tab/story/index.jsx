import { Tab } from '../Tab'
import PicassoBook from '~/.storybook/components/PicassoBook'

const componentDocs = PicassoBook.createComponentDocs(Tab, 'Tabs.Tab')

const chapter = PicassoBook.connectToPage(page => {
  page
    .createChapter('Tabs.Tab')
    // .addExample(
    //   'Tab/story/Vertical.example.tsx',
    //   {
    //     title: 'Vertical tab',
    //     takeScreenshot: false,
    //   },
    //   'base/Tabs'
    // )
    // .addExample('Tab/story/Disabled.example.tsx', 'Disabled tab', 'base/Tabs')
    // .addExample(
    //   'Tab/story/CustomValue.example.tsx',
    //   'Using custom value',
    //   'base/Tabs'
    // )
    .addExample(
      'Tab/story/IconOrBadge.example.tsx',
      'With Icon or Badge',
      'base/Tabs'
    )
})

export default {
  chapter,
  componentDocs,
}
