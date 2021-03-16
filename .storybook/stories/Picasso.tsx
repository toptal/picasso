// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { doc } from 'storybook-readme'
import { storiesOf } from '@storybook/react'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import README from '../../README.md'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import CHANGELOG from '../../packages/picasso/CHANGELOG.md'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import SUPPORT from '../../docs/SUPPORT.md'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import API_PRINCIPLES from '../../docs/api-principles.md'

storiesOf('Picasso', module)
  .addParameters({ happo: false })
  .add('Readme', doc(README))
  .add('Changelog', doc(CHANGELOG))
  .add('Support Info', doc(SUPPORT))
  .add('API Principles', doc(API_PRINCIPLES))
