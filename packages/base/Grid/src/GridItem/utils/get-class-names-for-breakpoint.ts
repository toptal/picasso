import type { BreakpointKeys } from '@toptal/picasso-provider'

import type { GridSize } from '../../types'

const growMapping: { [K in BreakpointKeys]: { [K in string]: string } } = {
  xs: {
    grow: 'xs:grow',
    'grow-0': 'xs:grow-0',
  },
  sm: {
    grow: 'sm:grow',
    'grow-0': 'sm:grow-0',
  },
  md: {
    grow: 'md:grow',
    'grow-0': 'md:grow-0',
  },
  lg: {
    grow: 'lg:grow',
    'grow-0': 'lg:grow-0',
  },
  xl: {
    grow: 'xl:grow',
    'grow-0': 'xl:grow-0',
  },
}

const maxWidthMapping: { [K in BreakpointKeys]: { [K in string]: string } } = {
  xs: {
    full: 'xs:max-w-full',
    none: 'xs:max-w-none',
    '1/12': 'xs:max-w-1/12',
    '2/12': 'xs:max-w-2/12',
    '3/12': 'xs:max-w-3/12',
    '4/12': 'xs:max-w-4/12',
    '5/12': 'xs:max-w-5/12',
    '6/12': 'xs:max-w-6/12',
    '7/12': 'xs:max-w-7/12',
    '8/12': 'xs:max-w-8/12',
    '9/12': 'xs:max-w-9/12',
    '10/12': 'xs:max-w-10/12',
    '11/12': 'xs:max-w-11/12',
  },
  sm: {
    full: 'sm:max-w-full',
    none: 'sm:max-w-none',
    '1/12': 'sm:max-w-1/12',
    '2/12': 'sm:max-w-2/12',
    '3/12': 'sm:max-w-3/12',
    '4/12': 'sm:max-w-4/12',
    '5/12': 'sm:max-w-5/12',
    '6/12': 'sm:max-w-6/12',
    '7/12': 'sm:max-w-7/12',
    '8/12': 'sm:max-w-8/12',
    '9/12': 'sm:max-w-9/12',
    '10/12': 'sm:max-w-10/12',
    '11/12': 'sm:max-w-11/12',
  },
  md: {
    full: 'md:max-w-full',
    none: 'md:max-w-none',
    '1/12': 'md:max-w-1/12',
    '2/12': 'md:max-w-2/12',
    '3/12': 'md:max-w-3/12',
    '4/12': 'md:max-w-4/12',
    '5/12': 'md:max-w-5/12',
    '6/12': 'md:max-w-6/12',
    '7/12': 'md:max-w-7/12',
    '8/12': 'md:max-w-8/12',
    '9/12': 'md:max-w-9/12',
    '10/12': 'md:max-w-10/12',
    '11/12': 'md:max-w-11/12',
  },
  lg: {
    full: 'lg:max-w-full',
    none: 'lg:max-w-none',
    '1/12': 'lg:max-w-1/12',
    '2/12': 'lg:max-w-2/12',
    '3/12': 'lg:max-w-3/12',
    '4/12': 'lg:max-w-4/12',
    '5/12': 'lg:max-w-5/12',
    '6/12': 'lg:max-w-6/12',
    '7/12': 'lg:max-w-7/12',
    '8/12': 'lg:max-w-8/12',
    '9/12': 'lg:max-w-9/12',
    '10/12': 'lg:max-w-10/12',
    '11/12': 'lg:max-w-11/12',
  },
  xl: {
    full: 'xl:max-w-full',
    none: 'xl:max-w-none',
    '1/12': 'xl:max-w-1/12',
    '2/12': 'xl:max-w-2/12',
    '3/12': 'xl:max-w-3/12',
    '4/12': 'xl:max-w-4/12',
    '5/12': 'xl:max-w-5/12',
    '6/12': 'xl:max-w-6/12',
    '7/12': 'xl:max-w-7/12',
    '8/12': 'xl:max-w-8/12',
    '9/12': 'xl:max-w-9/12',
    '10/12': 'xl:max-w-10/12',
    '11/12': 'xl:max-w-11/12',
  },
}

const basisMapping: { [K in BreakpointKeys]: { [K in string]: string } } = {
  xs: {
    auto: 'xs:basis-auto',
    '0': 'xs:basis-0',
    '1/12': 'xs:basis-1/12',
    '2/12': 'xs:basis-2/12',
    '3/12': 'xs:basis-3/12',
    '4/12': 'xs:basis-4/12',
    '5/12': 'xs:basis-5/12',
    '6/12': 'xs:basis-6/12',
    '7/12': 'xs:basis-7/12',
    '8/12': 'xs:basis-8/12',
    '9/12': 'xs:basis-9/12',
    '10/12': 'xs:basis-10/12',
    '11/12': 'xs:basis-11/12',
    full: 'xs:basis-full',
  },
  sm: {
    auto: 'sm:basis-auto',
    '0': 'sm:basis-0',
    '1/12': 'sm:basis-1/12',
    '2/12': 'sm:basis-2/12',
    '3/12': 'sm:basis-3/12',
    '4/12': 'sm:basis-4/12',
    '5/12': 'sm:basis-5/12',
    '6/12': 'sm:basis-6/12',
    '7/12': 'sm:basis-7/12',
    '8/12': 'sm:basis-8/12',
    '9/12': 'sm:basis-9/12',
    '10/12': 'sm:basis-10/12',
    '11/12': 'sm:basis-11/12',
    full: 'sm:basis-full',
  },
  md: {
    auto: 'md:basis-auto',
    '0': 'md:basis-0',
    '1/12': 'md:basis-1/12',
    '2/12': 'md:basis-2/12',
    '3/12': 'md:basis-3/12',
    '4/12': 'md:basis-4/12',
    '5/12': 'md:basis-5/12',
    '6/12': 'md:basis-6/12',
    '7/12': 'md:basis-7/12',
    '8/12': 'md:basis-8/12',
    '9/12': 'md:basis-9/12',
    '10/12': 'md:basis-10/12',
    '11/12': 'md:basis-11/12',
    full: 'md:basis-full',
  },
  lg: {
    auto: 'lg:basis-auto',
    '0': 'lg:basis-0',
    '1/12': 'lg:basis-1/12',
    '2/12': 'lg:basis-2/12',
    '3/12': 'lg:basis-3/12',
    '4/12': 'lg:basis-4/12',
    '5/12': 'lg:basis-5/12',
    '6/12': 'lg:basis-6/12',
    '7/12': 'lg:basis-7/12',
    '8/12': 'lg:basis-8/12',
    '9/12': 'lg:basis-9/12',
    '10/12': 'lg:basis-10/12',
    '11/12': 'lg:basis-11/12',
    full: 'lg:basis-full',
  },
  xl: {
    auto: 'xl:basis-auto',
    '0': 'xl:basis-0',
    '1/12': 'xl:basis-1/12',
    '2/12': 'xl:basis-2/12',
    '3/12': 'xl:basis-3/12',
    '4/12': 'xl:basis-4/12',
    '5/12': 'xl:basis-5/12',
    '6/12': 'xl:basis-6/12',
    '7/12': 'xl:basis-7/12',
    '8/12': 'xl:basis-8/12',
    '9/12': 'xl:basis-9/12',
    '10/12': 'xl:basis-10/12',
    '11/12': 'xl:basis-11/12',
    full: 'xl:basis-full',
  },
}

export const getClassNamesForBreakpoint = (
  breakpointKey: BreakpointKeys,
  size?: GridSize | boolean
) => {
  if (size === true) {
    // DELETE_BEFORE_MERGE https://github.com/mui/material-ui/blob/v4.x/packages/material-ui/src/Grid/Grid.js#L28
    return [
      basisMapping[breakpointKey]['0'],
      growMapping[breakpointKey]['grow'],
      maxWidthMapping[breakpointKey]['full'],
    ]
  } else if (size === 'auto') {
    // DELETE_BEFORE_MERGE https://github.com/mui/material-ui/blob/v4.x/packages/material-ui/src/Grid/Grid.js#L38
    return [
      basisMapping[breakpointKey]['auto'],
      growMapping[breakpointKey]['grow-0'],
      maxWidthMapping[breakpointKey]['none'],
    ]
  } else if (typeof size === 'number' && !isNaN(size)) {
    // DELETE_BEFORE_MERGE https://github.com/mui/material-ui/blob/v4.x/packages/material-ui/src/Grid/Grid.js#L48
    const widthName = size === 12 ? 'full' : `${size}/12`

    return [
      basisMapping[breakpointKey][widthName],
      maxWidthMapping[breakpointKey][widthName],
    ]
  }

  return []
}
