import { makeStyles } from '@material-ui/core/styles'
import type { Theme } from '@material-ui/core/styles'
import cx from 'classnames'

import type {
  BreakpointKeys,
  ResponsiveSpacingType,
  SpacingType,
} from '../config'
import { isResponsiveSpacing } from '../config'
import { spacingToRem } from './spacings'

const kebabToCamelCase = (str: string) =>
  str.replace(/-([a-z])/g, (substring: string) => substring[1].toUpperCase())

type ResponsiveCssProp = string // String for now, we can narrow it to CSS props eventually

type ResponsiveCssSpacings<K extends ResponsiveCssProp> = {
  [k in K]: SpacingType | undefined
}

const toCssVariableName = (
  breakpoint: BreakpointKeys,
  prop: ResponsiveCssProp
) => {
  return `--picasso-responsive--${breakpoint}--${prop}`
}

const toClassName = (breakpoint: BreakpointKeys, prop: ResponsiveCssProp) => {
  return `${breakpoint}--${prop}`
}

/**
 * Creates a CSS class for a given breakpoint and CSS property
 * that sets the value of the CSS property to the value of the CSS variable
 * for that breakpoint and CSS property.
 *
 * Simplified example, for `margin-top` CSS property and `xs` breakpoint:
 * ```css
 * .xs--margin-top {
 *    margin-top: var(--picasso-responsive--xs--margin-top);
 * }
 * ```
 */
const createJssVariableClassNames = (
  breakpoint: BreakpointKeys,
  cssProp: ResponsiveCssProp
) => {
  const className = toClassName(breakpoint, cssProp)
  const variable = `var(${toCssVariableName(breakpoint, cssProp)})`

  return {
    [className]: {
      [cssProp]: variable,
    },
  }
}

/**
 * Creates a CSS class for *every* breakpoint and a given CSS property
 * containing a media query for that breakpoint and sets the value of the CSS property
 * to the value of the CSS variable for that breakpoint and CSS property.
 *
 * Simplified example, for `margin-top` CSS property and `xs` breakpoint:
 * ```css
 * @media (min-width: 0px) {
 *   .xs--margin-top {
 *     margin-top: var(--picasso-responsive--xs--margin-top);
 *   }
 * }
 * ```
 */
const createMediaQueries = (cssProp: ResponsiveCssProp, theme: Theme) => {
  const mediaQueries: Record<string, {}> = {}

  for (const breakpoint of [...theme.breakpoints.keys].reverse()) {
    mediaQueries[theme.breakpoints.down(breakpoint)] =
      createJssVariableClassNames(breakpoint, cssProp)
  }

  return mediaQueries
}

/**
 * Creates a CSS class setting the picasso responsive CSS variable of the given CSS property
 * for all breakpoints on the responsive spacing value
 */
const createVariableValuesJss = (
  spacing: ResponsiveSpacingType,
  prop: ResponsiveCssProp
) => {
  const styles: Record<string, string> = {}

  for (const [brk, value] of Object.entries(spacing)) {
    styles[toCssVariableName(brk as BreakpointKeys, prop)] = spacingToRem(value)
  }

  return styles
}

/**
 * Just the default for a value that is not responsive
 * Just set the prop directly on all media queries
 */
const defaultCssProp = (
  value: Exclude<SpacingType, ResponsiveSpacingType>,
  prop: ResponsiveCssProp
) => ({
  [kebabToCamelCase(prop)]: spacingToRem(value),
})

const generateVariableInlineStyles = <K extends string>(
  props: readonly K[],
  values: ResponsiveCssSpacings<K>
) => {
  const styles: Record<string, string> = {}

  for (const prop of props) {
    const value = values[prop]

    if (value) {
      Object.assign(
        styles,
        isResponsiveSpacing(value)
          ? createVariableValuesJss(value, prop)
          : defaultCssProp(value, prop)
      )
    }
  }

  return styles
}

/**
 * Filter which media queries CSS classes should be applied,
 * we want to the element to fallback to the previous layer, so we only apply
 * the media queries that are explicitly set on spacing value
 */
const getBreakpointClassNamesToUse = <K extends string>(
  props: readonly K[],
  propSizes: ResponsiveCssSpacings<K>
) => {
  const classNames = new Set<string>()

  for (const prop of props) {
    const spacing = propSizes[prop]

    if (spacing && isResponsiveSpacing(spacing)) {
      Object.keys(spacing)
        .map(brk => toClassName(brk as BreakpointKeys, prop))
        .forEach(classNames.add, classNames)
    }
  }

  return [...classNames]
}

/**
 * Just aggregate all the media queries classes
 * for all responsive props passed
 */
const mediaQueriesClasses = <K extends ResponsiveCssProp>(
  responsiveProps: readonly K[],
  theme: Theme
) => {
  const mediaQueries: Record<string, Record<string, string>> = {}

  for (const prop of responsiveProps) {
    const newMediaQueries = createMediaQueries(prop, theme)

    for (const [brk, value] of Object.entries(newMediaQueries)) {
      mediaQueries[brk] = {
        ...mediaQueries[brk],
        ...value,
      }
    }
  }

  return mediaQueries
}

export const makeResponsiveSpacingProps = <K extends ResponsiveCssProp>(
  props: readonly K[],
  name: string
) => {
  const useStyles = makeStyles<Theme>(
    (theme: Theme) => mediaQueriesClasses(props, theme),
    {
      name: name,
    }
  )

  const useResponsiveClassNames = (propValues: ResponsiveCssSpacings<K>) => {
    const classes = useStyles()
    const mediaQueries = getBreakpointClassNamesToUse(props, propValues)

    return {
      className: cx(...mediaQueries.map(brkClassName => classes[brkClassName])),
      style: generateVariableInlineStyles(props, propValues),
    }
  }

  return useResponsiveClassNames
}
