import { Form } from '../Form'
import formFieldStory from '../../FormField/story'
import formHintStory from '../../FormHint/story'
import formLabelStory from '../../FormLabel/story'
import formErrorStory from '../../FormError/story'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Forms').createPage(
  'Form',
  `Helper components for building forms.
  
  ${PicassoBook.createSourceLink(__filename)}
  `
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: Form, name: 'Form' })
  .addComponentDocs(formFieldStory.componentDocs)
  .addComponentDocs(formHintStory.componentDocs)
  .addComponentDocs(formLabelStory.componentDocs)
  .addComponentDocs(formErrorStory.componentDocs)

page.connect(formFieldStory.chapter)
