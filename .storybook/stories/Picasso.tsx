// @ts-ignore
import { doc } from 'storybook-readme'
import { storiesOf } from '@storybook/react'

// @ts-ignore
import README from '../../README.md'
// @ts-ignore
import CHANGELOG from '../../packages/picasso/CHANGELOG.md'
// @ts-ignore
import LAB_CHANGELOG from '../../packages/picasso-lab/CHANGELOG.md'
// @ts-ignore
import SUPPORT from '../../docs/SUPPORT.md'
// @ts-ignore
import API_PRINCIPLES from '../../docs/api-principles.md'

storiesOf('Picasso|Folder', module)
  .add('Readme', doc(README))
  .add('Changelog', doc(CHANGELOG))
  .add('Lab Changelog', doc(LAB_CHANGELOG))
  .add('Support Info', doc(SUPPORT))
  .add('API Principles', doc(API_PRINCIPLES))
