import { doc } from 'storybook-readme'

import PicassoBook from '~/.storybook/components/PicassoBook'
import README from '../../README.md'
import CHANGELOG from '../../CHANGELOG.md'

const section = PicassoBook.section('Picasso Charts')

section.createDocPage('README', doc(README), { alwaysOnTop: true })
section.createDocPage('CHANGELOG', doc(CHANGELOG), { alwaysOnTop: true })
