import PicassoBook from '~/.storybook/components/PicassoBook'
import { createMarkdownPage } from '~/.storybook/components/Markdown'
import README from '../../README.md'
import CHANGELOG from '../../CHANGELOG.md'

const section = PicassoBook.section('Picasso Query Builder')

section.createDocPage('README', createMarkdownPage(README), {
  alwaysOnTop: true,
})
section.createDocPage('CHANGELOG', createMarkdownPage(CHANGELOG), {
  alwaysOnTop: true,
})
