import {
  DEFAULT_VERTICAL_MARGIN_V,
  DEFAULT_VERTICAL_MARGIN_H,
  DEFAULT_HORIZONTAL_MARGIN_H,
  DEFAULT_HORIZONTAL_MARGIN_V
} from '../variables'
import { DirectionsType } from '../types'

export const getDefaultMargins = (
  direction: DirectionsType,
  verticalMargin?: number,
  horizontalMargin?: number
): [number, number] => {
  let finalVMargin =
    direction === 'horizontal'
      ? DEFAULT_VERTICAL_MARGIN_H
      : DEFAULT_VERTICAL_MARGIN_V
  let finalHMargin =
    direction === 'horizontal'
      ? DEFAULT_HORIZONTAL_MARGIN_H
      : DEFAULT_HORIZONTAL_MARGIN_V

  if (verticalMargin) {
    finalVMargin = verticalMargin
  }

  if (horizontalMargin) {
    finalHMargin = horizontalMargin
  }

  return [finalVMargin, finalHMargin]
}
