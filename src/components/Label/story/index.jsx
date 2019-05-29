import PicassoBook from '~/.storybook/components/PicassoBook'

import labelGroupStory from '@components/LabelGroup/story'

import { Label } from '../Label'

const page = PicassoBook.createPage(
  'Label',
  `Labels are used to describe other topics, including textareas,
  form fields, users, and more. By default, labels are read-only UI elements.
  They are used to surface important information about a topic. Labels may also
  be used to convey status, or used within a group to show selection.`
)

page
  .createTabChapter('Props')
  .addComponentDocs({
    component: Label,
    additionalDocs: {
      onDelete: {
        type: {
          description: '(event: any) => void | undefined'
        }
      }
    },
    name: 'Label'
  })
  .addComponentDocs(labelGroupStory.componentDocs)

page
  .createChapter()
  .addExample('Label/story/Default.example.jsx', 'Default')
  .addExample('Label/story/Dismissible.example.jsx', 'Dismissible')
  .addExample('Label/story/WithIcon.example.jsx', 'With icon')

page.connect(labelGroupStory.chapter)
