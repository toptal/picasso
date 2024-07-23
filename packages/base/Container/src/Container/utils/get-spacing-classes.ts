import type { SpacingType } from '@toptal/picasso-provider'
import { isPicassoSpacing, isResponsiveSpacing } from '@toptal/picasso-provider'

import { SPACING_CLASSES, DEPRECATED_CLASSES } from './constants'

type SpacingProps = {
  gap?: SpacingType
  padded?: SpacingType
  top?: SpacingType
  bottom?: SpacingType
  right?: SpacingType
  left?: SpacingType
}

type ResultType = string | undefined
type BreakpointType = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export const getMappedClass = (
  spacing: SpacingType | undefined,
  type: keyof SpacingProps
): ResultType => {
  if (!spacing || typeof spacing === 'number' || isResponsiveSpacing(spacing)) {
    return
  }

  if (isPicassoSpacing(spacing)) {
    const { baseTokenIndex } = spacing

    return SPACING_CLASSES[baseTokenIndex][type].default
  }

  if (typeof spacing === 'string') {
    return DEPRECATED_CLASSES[spacing][type].default
  }

  if (isResponsiveSpacing(spacing)) {
    return
  }
}

export const getResponsiveClasses = (
  spacing: SpacingType,
  type: keyof SpacingProps
) => {
  if (!isResponsiveSpacing(spacing)) {
    return
  }

  const classes = []

  for (const viewport in spacing) {
    const vp = viewport as BreakpointType
    const baseTokenIndex = spacing[vp]?.baseTokenIndex

    if (baseTokenIndex === undefined) {
      continue
    }

    const classesByToken = SPACING_CLASSES[baseTokenIndex]
    const className = classesByToken[type][vp]

    classes.push(className)
  }

  return classes
}

const getClassList = (
  prop: SpacingType | undefined,
  type: keyof SpacingProps
) => {
  if (!prop) {
    return []
  }

  return isResponsiveSpacing(prop)
    ? getResponsiveClasses(prop, type)
    : getMappedClass(prop, type)
}

export const getSpacingClasses = ({
  gap,
  padded,
  top,
  bottom,
  right,
  left,
}: SpacingProps) => {
  return [
    getClassList(gap, 'gap'),
    getClassList(padded, 'padded'),
    getClassList(top, 'top'),
    getClassList(bottom, 'bottom'),
    getClassList(right, 'right'),
    getClassList(left, 'left'),
  ]
}

const convertToRem = (value?: SpacingType) => {
  if (typeof value !== 'number') {
    return
  }

  return `${value}rem`
}

export const getSpacingStyles = ({
  gap,
  padded,
  top,
  bottom,
  right,
  left,
}: SpacingProps) => {
  const styles: Record<string, string> = {}

  const addStyle = (key: string, value?: SpacingType) => {
    const convertedValue = convertToRem(value)

    if (convertedValue !== undefined) {
      styles[key] = convertedValue
    }
  }

  addStyle('gap', gap)
  addStyle('padding', padded)
  addStyle('marginTop', top)
  addStyle('marginBottom', bottom)
  addStyle('marginRight', right)
  addStyle('marginLeft', left)

  return styles
}
