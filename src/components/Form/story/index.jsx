import PicassoBook from '~/.storybook/components/PicassoBook'

import { Form } from '../Form'

import formFieldStory from '@components/FormField/story'
import formHintStory from '@components/FormHint/story'
import formLabelStory from '@components/FormLabel/story'
import formErrorStory from '@components/FormError/story'

const page = PicassoBook.createPage(
  'Form',
  `Helper components for building forms.`,
  'Forms'
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: Form, name: 'Form' })
  .addComponentDocs(formFieldStory.componentDocs)
  .addComponentDocs(formHintStory.componentDocs)
  .addComponentDocs(formLabelStory.componentDocs)
  .addComponentDocs(formErrorStory.componentDocs)

page.connect(formFieldStory.chapter)
