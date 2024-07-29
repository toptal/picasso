import { createMarkdownPage } from '~/.storybook/components/Markdown'
import PicassoBook from '~/.storybook/components/PicassoBook'
import README from '../../README.md'
import CHANGELOG from '../../CHANGELOG.md'

const section = PicassoBook.section('Picasso Forms')

section.createDocPage('README', createMarkdownPage(README), {
  alwaysOnTop: true,
})
section.createDocPage('CHANGELOG', createMarkdownPage(CHANGELOG), {
  alwaysOnTop: true,
})

const page = section.createPage('Final Form', 'Final Form')

page
  .createChapter()
  .addExample(
    'story/FormSpy.example.tsx',
    {
      title: 'Form Spy',
      description: `
            Sometimes you might want to perform a conditional action based on the value of another field in the form or its overall state.
            For smaller forms, you can just directly work with values, but with a larger form you can avoid prop drilling with FormSpy.`,
      takeScreenshot: false,
    },
    'picasso-form'
  )
  .addExample(
    'story/Deserialization.example.tsx',
    {
      title: 'Deserialization',
      description: `
            By default final-form converts all values to strings.
            If want to pass a boolean or a number value to a field, 
            you should pass it serialized and deserialize it later.
            `,
      takeScreenshot: false,
    },
    'picasso-form'
  )
