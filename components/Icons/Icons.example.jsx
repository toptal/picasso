import React from 'react'
import { storiesOf } from '@storybook/react'

import StoryTeller from '../../.storybook/StoryTeller'
import Spacer from '../Spacer'
import * as iconsImports from './index'
import Icon from './Icon'

// remove Icon component from icon samples
const { default: IconsLibrary, ...icons } = iconsImports

IconsLibrary.add(...Object.values(icons))

const stories = storiesOf('Icons', module)

const teller = new StoryTeller('Icons')
const chapter = teller.addChapter()

chapter.addSection('Available icons', null, () => (
  <div>
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
              <Icon
                name={icon}
                style={{ color: '#204ecf', height: '3em', width: '3em' }}
              />
              <Spacer bottom={2} />
              <span>{icon}</span>
            </div>
          </Spacer>
        )
      })}
    </div>

    <span>
      <h3>Example:</h3> <br />
      {`> App.js`} <br />
      {`import IconsLibrary, { Check } from '@toptal/picasso/Icons`} <br />{' '}
      <br />
      {`IconsLibrary.add(Check)`} <br /> <br />
      {`> Component.js`} <br />
      {`import { Icon } from '@toptal/picasso'`} <br />
      {`...`} <br />
      {`render() {`} <br />
      {`...`} <br />
      {`<Icon name='Check' style={{ color: '#204ecf' }} />`} <br />
      {`...`} <br />
      {`}`} <br />
    </span>
  </div>
))

stories.addWithChapters('Icons', teller.toStory())
