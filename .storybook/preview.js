import React from 'react'
import 'github-markdown-css/github-markdown-light.css'
import 'happo-plugin-storybook/register'
import Picasso from '@toptal/picasso-provider'

import { generateUrl, getHost } from '../src/utils/url-generator'
import CodeExample from './components/CodeExample'

export const parameters = {
  layout: 'padded',
  a11y: {
    element: '.component-section-container',
  },
}

const withLiveEdit = (Story, context) => {
  console.log(context)

  const permanentLink = generateUrl({
    host: getHost(),
    kind: context.kind,
    type: context.componentId,
    section: context.id,
  })

  const { fileName } = context.parameters
  const source =
    fileName.split('src/')[1].split('/story/')[0] +
    '/story/' +
    context.name +
    '.example.tsx'

  return (
    <div
      className='chapter-container'
      style={{ display: 'block' }}
      id={context.id}
    >
      <CodeExample
        src={source}
        // src='BarChart/story/Default.example.tsx'
        // module='picasso'
        permanentLink={permanentLink}
        // showEditCode={true}
      />
    </div>
  )
}

const withPicasso = story => (
  <Picasso loadFonts={loadFonts} fixViewport={false} loadFavicon={false}>
    {story()}
  </Picasso>
)

export const decorators = [withPicasso, withLiveEdit]
