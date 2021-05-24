import { Switch } from '../Switch'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Components').createPage(
  'Switch',
  `
    Switches are used to toggle the state of an element on or off.
    
    ${PicassoBook.createBaseDocsLink(
      'https://share.goabstract.com/07bda3d7-0417-47ca-a4cd-9dbb7a9dfcd1?collectionLayerId=1992e79b-f871-4077-a72c-2f9a237da809&mode=design&present=true'
    )}
  `
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: Switch, name: 'Switch' })

page
  .createChapter()
  .addExample('Switch/story/Uncontrolled.example.tsx', {
    title: 'Uncontrolled',
    description: 'Can control its state by itself'
  })
  .addExample('Switch/story/Controlled.example.tsx', {
    title: 'Controlled',
    description: 'Stateless Switch, state should be controlled using prop'
  })
  .addExample('Switch/story/Disabled.example.tsx', 'Disabled')
