// @ts-ignore
import { doc } from 'storybook-readme'
import { storiesOf } from '@storybook/react'

// @ts-ignore
import README from '../../README.md'
// @ts-ignore
import CHANGELOG from '../../CHANGELOG.md'
// @ts-ignore
import SUPPORT from '../../docs/SUPPORT.md'

storiesOf('Picasso|Folder', module)
  .add('Readme', doc(README))
  .add('Changelog', doc(CHANGELOG))
  .add('Support Info', doc(SUPPORT))
