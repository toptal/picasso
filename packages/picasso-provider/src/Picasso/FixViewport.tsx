import { unsafeErrorLog } from '@toptal/picasso-utils'
import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'

import { isBrowser } from '../utils'

const FixViewport = () => {
  const [warned, setWarned] = useState(false)

  if (!isBrowser()) {
    return null
  }

  const content = 'width=device-width, user-scalable=no'
  // eslint-disable-next-line ssr-friendly/no-dom-globals-in-react-fc
  const nonPicassoViewportTags = document.querySelectorAll(
    'meta[name="viewport"]:not([data-picasso="true"])'
  )

  if (nonPicassoViewportTags.length > 0) {
    if (!warned) {
      unsafeErrorLog(
        `PICASSO:
        I wanted to add viewport meta tag to your page but failed as it already contains ${nonPicassoViewportTags.length}.
        My viewport meta tag content is "${content}".
        The absence of this content may cause some of my features to work incorrectly.
        For example, inputs will be scaled when focused on Safari, iOS.
        Please, delete your viewport meta tag so I can insert mine.`
      )
      setWarned(true)
    }

    return null
  }

  return (
    <Helmet>
      <meta name='viewport' content={content} data-picasso='true' />
    </Helmet>
  )
}

export default FixViewport
