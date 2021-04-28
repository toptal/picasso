// eslint-disable-file @typescript-eslint/ban-ts-comment
// @ts-ignore
import { doc } from 'storybook-readme'

import PicassoBook from '../../../components/PicassoBook'
// @ts-ignore
import README from '../../../../packages/picasso/README.md'
// @ts-ignore
import CHANGELOG from '../../../../packages/picasso/CHANGELOG.md'
// @ts-ignore
import API_PRINCIPLES from '../../../../docs/api-principles.md'

const section = PicassoBook.section('Picasso')
section.createDocPage('Readme', doc(README))
section.createDocPage('Changelog', doc(CHANGELOG))
section.createDocPage('API Principles', doc(API_PRINCIPLES))
