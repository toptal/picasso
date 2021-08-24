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

export const getFinalMargins = (
  direction: DirectionsType,
  verticalMargin?: number,
  horizontalMargin?: number
): [number, number] => {
  const [finalVMargin, finalHMargin] = defaultMargins[direction]

  return [verticalMargin || finalVMargin, horizontalMargin || finalHMargin]
}
