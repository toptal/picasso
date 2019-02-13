import React from 'react'
import { storiesOf } from '@storybook/react'

import StoryTeller from '../../../.storybook/StoryTeller'
import CodeExample from '../../../.storybook/components/CodeExample'
import Container from '../../../.storybook/components/Container'
import Spacer from '../../Spacer'
import * as iconsImports from '../index'
import Icon from '../Icon'

const { default: IconsLibrary, ...icons } = iconsImports

IconsLibrary.add(...Object.values(icons))

const stories = storiesOf('Icons', module)

const teller = new StoryTeller('Icons')
const chapter = teller.addChapter()

chapter.addSection('Icon', 'Component to mount icon', () => (
  <Container>
    <CodeExample src='Icons/story/Icon-example.jsx' />
  </Container>
))

chapter.addSection(
  'Size',
  'Recommended way to use `font-size` to adjust the icon size, but also you can specify `height` and `width` within styles',
  () => (
    <Container>
      <CodeExample src='Icons/story/Size-example.jsx' />
    </Container>
  )
)

chapter.addSection('Color', null, () => (
  <Container>
    <CodeExample src='Icons/story/Color-example.jsx' />
  </Container>
))

chapter.addSection('Available icons list', null, () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'row',
      flex: 1
    }}
  >
    {Object.keys(icons).map((icon, index) => {
      return (
        // eslint-disable-next-line react/no-array-index-key
        <Spacer bottom={2} key={index} right={2}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Icon name={icon} style={{ height: '2em', width: '2em' }} />
            <Spacer bottom={2} />
            <span>{icon}</span>
          </div>
        </Spacer>
      )
    })}
  </div>
))

stories.addWithChapters('Icons', teller.toStory())
