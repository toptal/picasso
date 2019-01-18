import { doc } from 'storybook-readme'
import { storiesOf } from '@storybook/react'

import README from '../../README.md'
import CHANGELOG from '../../CHANGELOG.md'

storiesOf('Picasso', module)
  .add('Readme', doc(README))
  .add('Changelog', doc(CHANGELOG))
