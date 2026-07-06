import { screens } from '../Picasso/config'

/**
 * Global CSS that fixes the page-width jump when the vertical scrollbar
 * appears/disappears. Applied only at md/lg/xl via the runtime-resolved
 * `screens()` media query (which honors `disableMobileBreakpoints()`); returns
 * an empty string when no matching breakpoint is active.
 */
export const preventPageWidthChangeCss = (): string => {
  const media = screens('md', 'lg', 'xl')

  if (!media) {
    return ''
  }

  return `${media} {
  html {
    width: 100%;
    overflow-x: hidden;
  }
  body {
    width: 100vw;
  }
}`
}
