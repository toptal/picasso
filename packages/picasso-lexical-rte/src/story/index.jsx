import { doc } from 'storybook-readme'

import PicassoBook from '~/.storybook/components/PicassoBook'
import README from '../../README.md'
import CHANGELOG from '../../CHANGELOG.md'

const section = PicassoBook.section('Picasso Lexical RTE')

section.createDocPage('README', doc(README), { alwaysOnTop: true })
section.createDocPage('CHANGELOG', doc(CHANGELOG), { alwaysOnTop: true })

const page = section.createPage('Lexical RTE')

page.createChapter().addExample('story/LexicalRTE.example.tsx', {
  title: 'Lexical RTE',
  description: `
          Some Text      
      `,
  takeScreenshot: false,
})
