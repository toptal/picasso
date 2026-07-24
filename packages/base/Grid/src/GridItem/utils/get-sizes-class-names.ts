import type { GridItemSizeProps } from '../GridItem'
import { getClassNamesForBreakpoint } from './get-class-names-for-breakpoint'

export const getSizesClassNames = ({
  xs,
  sm,
  md,
  lg,
  xl,
}: GridItemSizeProps) => [
  getClassNamesForBreakpoint('xs', xs),
  getClassNamesForBreakpoint('sm', sm),
  getClassNamesForBreakpoint('md', md),
  getClassNamesForBreakpoint('lg', lg),
  getClassNamesForBreakpoint('xl', xl),
]
