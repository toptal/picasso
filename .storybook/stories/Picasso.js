import { doc } from 'storybook-readme'
import { storiesOf } from '@storybook/react'

import README from '../../README.md'
import CHANGELOG from '../../CHANGELOG.md'
import SUPPORT from '../../docs/SUPPORT.md'

storiesOf('Picasso|Folder', module)
  .add('Readme', doc(README))
  .add('Changelog', doc(CHANGELOG))
  .add('Support Info', doc(SUPPORT))
