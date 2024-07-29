import { createMarkdownPage } from '~/.storybook/components/Markdown'
import PicassoBook from '~/.storybook/components/PicassoBook'
import README from '../../README.md'
import CHANGELOG from '../../CHANGELOG.md'

const section = PicassoBook.section('Picasso Pictograms')

section.createDocPage('README', createMarkdownPage(README), {
  alwaysOnTop: true,
})
section.createDocPage('CHANGELOG', createMarkdownPage(CHANGELOG), {
  alwaysOnTop: true,
})
