// eslint-disable-file @typescript-eslint/ban-ts-comment
// @ts-ignore
import { doc } from 'storybook-readme'
import { storiesOf } from '@storybook/react'

// @ts-ignore
import README from '../../packages/picasso/README.md'
// @ts-ignore
import CHANGELOG from '../../packages/picasso/CHANGELOG.md'
// @ts-ignore
import API_PRINCIPLES from '../../docs/api-principles.md'

storiesOf('Picasso', module)
  .addParameters({ happo: false })
  .add('Readme', doc(README))
  .add('Changelog', doc(CHANGELOG))
  .add('API Principles', doc(API_PRINCIPLES))
