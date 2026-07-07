import type { BreakpointKeys } from '../../config'
import { breakpointsList } from '../../config'
import { toClassName } from './to-class-name'
import { toCssVariableName } from './to-css-variable-name'
import type { ResponsiveCssProp } from './types'

/**
 * Builds the media-query CSS backing the responsive spacing classes: one rule
 * per breakpoint × prop, mapping `.<name>-<breakpoint>--<prop>` to its CSS
 * variable.
 *
 * Breakpoints are read lazily from the live config so the rules honour
 * `disableMobileBreakpoints()`, which mutates the breakpoint values in place.
 *
 * NOTE: rules are emitted largest-breakpoint-first, preserving the original
 * inverted cascade — on wide viewports the *smallest* specified breakpoint wins
 * (mobile-first semantics reversed). This defect predates the migration and is
 * kept byte-for-byte on purpose; the correct cascade lands with the Tailwind
 * convergence in PF-2226.
 */
export const buildResponsiveCss = (
  props: readonly ResponsiveCssProp[],
  name: string
): string => {
  const breakpoints = Object.keys(breakpointsList) as BreakpointKeys[]
  const rules: string[] = []

  for (const breakpoint of [...breakpoints].reverse()) {
    const minWidth = breakpointsList[breakpoint]

    for (const prop of props) {
      const className = `${name}-${toClassName(breakpoint, prop)}`
      const variable = toCssVariableName(breakpoint, prop)

      rules.push(
        `@media (min-width:${minWidth}px){.${className}{${prop}:var(${variable})}}`
      )
    }
  }

  return rules.join('')
}

const injectedNames = new Set<string>()

/**
 * Injects the responsive spacing stylesheet for a given hook `name` exactly once
 * (client-side only; a no-op during SSR).
 */
export const injectResponsiveStyles = (
  props: readonly ResponsiveCssProp[],
  name: string
): void => {
  if (typeof document === 'undefined' || injectedNames.has(name)) {
    return
  }

  injectedNames.add(name)

  const id = `picasso-responsive-${name}`

  if (document.getElementById(id)) {
    return
  }

  const style = document.createElement('style')

  style.id = id
  style.textContent = buildResponsiveCss(props, name)

  document.head.appendChild(style)
}
