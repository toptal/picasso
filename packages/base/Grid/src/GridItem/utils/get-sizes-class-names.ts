import type { GridSizes } from '../GridItem'
import { getClassNamesForBreakpoint } from './get-class-names-for-breakpoint'

export const getSizesClassNames = ({ xs, sm, md, lg, xl }: GridSizes) => [
  getClassNamesForBreakpoint('xs', xs),
  getClassNamesForBreakpoint('sm', sm),
  getClassNamesForBreakpoint('md', md),
  getClassNamesForBreakpoint('lg', lg),
  getClassNamesForBreakpoint('xl', xl),
]
