import {
  DEFAULT_VERTICAL_MARGIN_V,
  DEFAULT_VERTICAL_MARGIN_H,
  DEFAULT_HORIZONTAL_MARGIN_H,
  DEFAULT_HORIZONTAL_MARGIN_V
} from '../variables'
import { DirectionsType } from '../types'

const defaultMargins = {
  horizontal: [DEFAULT_VERTICAL_MARGIN_H, DEFAULT_HORIZONTAL_MARGIN_H],
  vertical: [DEFAULT_VERTICAL_MARGIN_V, DEFAULT_HORIZONTAL_MARGIN_V]
}

export const getDefaultMargins = (
  direction: DirectionsType,
  verticalMargin?: number,
  horizontalMargin?: number
): [number, number] => {
  let finalVMargin, finalHMargin: number

  ;[finalVMargin, finalHMargin] = defaultMargins[direction]

  if (verticalMargin) {
    finalVMargin = verticalMargin
  }

  if (horizontalMargin) {
    finalHMargin = horizontalMargin
  }

  return [finalVMargin, finalHMargin]
}
