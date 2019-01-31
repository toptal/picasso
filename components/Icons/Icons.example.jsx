import React, { Suspense } from 'react'
import { storiesOf } from '@storybook/react'

import StoryTeller from '../../.storybook/StoryTeller'
import Spacer from '../Spacer'

const stories = storiesOf('Icons', module)

const teller = new StoryTeller('Icons')
const chapter = teller.addChapter()

// Find all icon components
// ['./Check.jsx', './Minus.jsx', ...]
const reqAllIcons = require.context('./', true, /^((?!example).)*\.jsx$/)
// Extract only icon component names
// ['Check', 'Minus', ...]
const icons = reqAllIcons.keys().map(s => /\.\/(.*)\.jsx/g.exec(s)[1])

chapter.addSection('Available icons', null, () => (
  <div>
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        flex: 1
      }}
    >
      {icons.map((icon, index) => {
        const Icon = React.lazy(() => import(`./${icon}`))

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
              <Suspense fallback={<div>Loading...</div>}>
                <Icon fill='#204ecf' height={64} width={64} />

                <Spacer bottom={2} />

                <span>{icon}</span>
              </Suspense>
            </div>
          </Spacer>
        )
      })}
    </div>

    <span>
      <h3>Example:</h3> <br />
      {`import CheckSvg from '@toptal/picasso/Icons/Check`} <br />
      {`...`} <br />
      {`render() {`} <br />
      {`...`} <br />
      {`<CheckSvg fill='#204ecf' />`} <br />
      {`...`} <br />
      {`}`} <br />
    </span>
  </div>
))

stories.addWithChapters('Icons', teller.toStory())
