import React from 'react'

import { preventPageWidthChangeCss } from './styles'

/**
 * This component applies global styles that fix the problem with jumping page width.
 * The problem comes from disappearing vertical page scrollbar due to varying page height.
 */
const PreventPageWidthChangeOnScrollbar = () => {
  const css = preventPageWidthChangeCss()

  if (!css) {
    return null
  }

  return <style dangerouslySetInnerHTML={{ __html: css }} />
}

export default PreventPageWidthChangeOnScrollbar
