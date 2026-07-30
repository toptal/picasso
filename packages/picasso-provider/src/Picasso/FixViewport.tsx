import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'

import { PicassoBreakpoints } from './config'
import { isBrowser } from '../utils'

export interface FixViewportProps {
  /** Set to false for apps without mobile layouts, to pin the layout viewport */
  responsive?: boolean
}

const FixViewport = ({ responsive = true }: FixViewportProps) => {
  const [warned, setWarned] = useState(false)

  if (!isBrowser()) {
    return null
  }

  // Non-responsive apps have no mobile layouts, so pin the viewport to `md` —
  // mobile browsers then evaluate CSS media queries (Tailwind's static `md:`
  // variants included) at the width the JS breakpoints assume; desktop ignores
  // `width`. Zoom stays enabled: the pin already scales pages down (WCAG 1.4.4).
  const content = responsive
    ? 'width=device-width, user-scalable=no'
    : `width=${PicassoBreakpoints.breakpoints.values.md}`
  // eslint-disable-next-line ssr-friendly/no-dom-globals-in-react-fc
  const nonPicassoViewportTags = document.querySelectorAll(
    'meta[name="viewport"]:not([data-picasso="true"])'
  )

  if (nonPicassoViewportTags.length > 0) {
    if (!warned) {
      console.error(
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
