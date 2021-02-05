import { doc } from 'storybook-readme'
import { storiesOf } from '@storybook/react'

import README from '../../../README.md'

storiesOf('Picasso Lab').add('README', doc(README))
