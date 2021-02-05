import { doc } from 'storybook-readme'
import { storiesOf } from '@storybook/react'

import PicassoBook from '~/.storybook/components/PicassoBook'
import README from '../../README.md'
import CHANGELOG from '../../CHANGELOG.md'

storiesOf('Picasso Forms', module)
  .add('README', doc(README))
  .add('CHANGELOG', doc(CHANGELOG))

const page = PicassoBook.section('Picasso Forms').createPage(
  'Final Form',
  'Final Form'
)

page.createChapter().addExample(
  'story/FormSpy.example.tsx',
  {
    title: 'Form Spy',
    description: `
            Sometimes you might want to perform a conditional action based on the value of another field in the form or its overall state.
            For smaller forms, you can just directly work with values, but with a larger form you can avoid prop drilling with FormSpy.`
  },
  'picasso-form'
) // picasso-skip-visuals
