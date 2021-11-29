import { useMemo } from 'react'

import {
  DEFAULT_VERTICAL_MARGIN_V,
  DEFAULT_VERTICAL_MARGIN_H,
  DEFAULT_HORIZONTAL_MARGIN_H,
  DEFAULT_HORIZONTAL_MARGIN_V
} from './variables'
import { DirectionsType } from './types'

export const useFinalMargins = (
  direction: DirectionsType,
  verticalMargin?: number,
  horizontalMargin?: number
): [number, number] => {
  return useMemo(
    () => getFinalMargins(direction, verticalMargin, horizontalMargin),
    [direction, verticalMargin, horizontalMargin]
  )
}

const defaultMargins = {
  horizontal: [DEFAULT_VERTICAL_MARGIN_H, DEFAULT_HORIZONTAL_MARGIN_H],
  vertical: [DEFAULT_VERTICAL_MARGIN_V, DEFAULT_HORIZONTAL_MARGIN_V]
}

const getFinalMargins = (
  direction: DirectionsType,
  verticalMargin?: number,
  horizontalMargin?: number
): [number, number] => {
  const [finalVMargin, finalHMargin] = defaultMargins[direction]

  return [verticalMargin || finalVMargin, horizontalMargin || finalHMargin]
}
