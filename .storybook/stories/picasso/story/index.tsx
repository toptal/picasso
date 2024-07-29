// eslint-disable-file @typescript-eslint/ban-ts-comment
// @ts-ignore
import PicassoBook from '../../../components/PicassoBook'
import { createMarkdownPage } from '../../../components/Markdown'
// @ts-ignore
import README from '../../../../packages/picasso/README.md'
// @ts-ignore
import CHANGELOG from '../../../../packages/picasso/CHANGELOG.md'

const section = PicassoBook.section('Picasso')
section.createDocPage('Introduction', createMarkdownPage(README))
section.createDocPage('Changelog', createMarkdownPage(CHANGELOG))
