import { Tab } from '../Tab'
import PicassoBook from '~/.storybook/components/PicassoBook'

const componentDocs = PicassoBook.createComponentDocs(Tab, 'Tabs.Tab')

const chapter = PicassoBook.connectToPage(page => {
  page
    .createChapter('Tabs.Tab')
    .addExample('Tab/story/Disabled.example.tsx', 'Disabled tab') // picasso-skip-visuals
    .addExample('Tab/story/CustomValue.example.tsx', 'Using custom value') // picasso-skip-visuals
    .addExample('Tab/story/Icon.example.tsx', 'With Icon') // picasso-skip-visuals
})

export default {
  chapter,
  componentDocs
}
