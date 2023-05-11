import { doc } from 'storybook-readme'

import PicassoBook from '~/.storybook/components/PicassoBook'
import README from '../../README.md'
import CHANGELOG from '../../CHANGELOG.md'

const section = PicassoBook.section('Picasso Lexical RTE')

section.createDocPage('README', doc(README), { alwaysOnTop: true })
section.createDocPage('CHANGELOG', doc(CHANGELOG), { alwaysOnTop: true })

const page = section.createPage('Lexical RTE Composable')

page.createChapter().addExample('story/LexicalEditor.example.tsx', {
  title: 'Lexical RTE',
  description: `
          Some Text      
      `,
  takeScreenshot: false,
})

page.createChapter().addExample('story/LexicalEditor1.example.tsx', {
  title: 'Lexical RTE 1',
  description: `
          Some Text      
      `,
  takeScreenshot: false,
})

page.createChapter().addExample('story/LexicalEditor2.example.tsx', {
  title: 'Lexical RTE 2',
  description: `
          Some Text      
      `,
  takeScreenshot: false,
})
