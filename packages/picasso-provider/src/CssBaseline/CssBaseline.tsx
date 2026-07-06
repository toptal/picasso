import type { ReactNode } from 'react'
import React from 'react'

import { CSS_BASELINE } from './styles'

interface Props {
  children?: ReactNode
}

/**
 * Injects Picasso's global CSS reset. Rendered by the provider only when its
 * `reset` prop is set (the default), so `reset={false}` still fully opts out.
 * The reset ships as a runtime `<style>` (no MUI/JSS), so it applies in the SSR
 * shell and requires no CSS-entrypoint changes from consumers.
 *
 * TODO: [PF-2221] once the `react < 19` peer cap is lifted and React 19 types
 * land, switch to a hoistable `<style href="picasso-css-baseline"
 * precedence="low">` for automatic <head> hoisting + de-duplication across
 * nested providers. Not possible yet (@types/react is v17 in this workspace).
 */
const CssBaseline = ({ children }: Props) => (
  <>
    <style dangerouslySetInnerHTML={{ __html: CSS_BASELINE }} />
    {children}
  </>
)

export default CssBaseline
