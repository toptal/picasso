import SubmitButton from '../SubmitButton'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Picasso Forms').createPage(
  'SubmitButton',
  'SubmitButton reacts to the submission state of the form.'
)

page.createTabChapter('Props').addComponentDocs({
  component: SubmitButton,
  name: 'SubmitButton',
  additionalDocs: {
    buttonType: {
      name: 'buttonType',
      type: 'string',
      description: 'The button type to use',
      defaultValue: 'rectangular',
      enums: ['rectangular', 'circular', 'action']
    },
    variant: {
      name: 'variant',
      type: 'string',
      description:
        'The variant to use. Depending on the "buttonType" property value, the "variant" property accepts circular or action button "variant" property values.'
    }
  }
})

page
  .createChapter()
  .addExample('SubmitButton/story/Default.example.tsx', 'Default')
  .addExample('SubmitButton/story/ButtonTypes.example.tsx', 'Button types')
