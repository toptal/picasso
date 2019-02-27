import PicassoBook from '../../../.storybook/components/PicassoBook'

const page = PicassoBook.createPage(
  'Label',
  `Labels are used to describe other topics, incluidng textareas,
  form fields, users, and more. By default, labels are read-only UI elements.
  They are used to surface important information about a topic. Labels may also
  be used to convey status, or used within a group to show selection.`
)

const docs = [
  {
    name: 'label',
    type: 'string',
    description: 'Content of the label component'
  },
  {
    name: 'onDelete',
    type: 'function',
    description:
      'Called when delete icon is clicked. If callback is not provided icon is not rendered'
  },
  {
    name: 'variant',
    type: 'enum',
    defaultValue: '',
    description: 'Select different label color theme',
    enums: ['flat', 'success', 'error']
  }
]

page
  .addDocs(docs)
  .addExample('Label/story/Default.example.jsx', 'Default')
  .addExample('Label/story/Dismissible.example.jsx', 'Dismissible')
  .addExample('Label/story/Flat.example.jsx', 'Flat')
  .addExample('Label/story/Statuses.example.jsx', {
    title: 'Statuses',
    description: 'Use these to communicate status'
  })
