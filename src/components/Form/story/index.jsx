import PicassoBook from '~/.storybook/components/PicassoBook'

import formFieldStory from '@components/FormField/story'
import formHintStory from '@components/FormHint/story'

const page = PicassoBook.createPage(
  'Form',
  `Helper components for building forms.`,
  'Forms'
)

page
  .createTabChapter('Props')
  .addComponentDocs(formFieldStory.componentDocs)
  .addComponentDocs(formHintStory.componentDocs)

page.connect(formFieldStory.chapter)
page.connect(formHintStory.chapter)
