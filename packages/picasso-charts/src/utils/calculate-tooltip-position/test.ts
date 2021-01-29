import { getTooltipTranslate } from './calculate-tooltip-position'
import { PositionTranslate } from '../../types'

const tooltipUnrestricted: PositionTranslate = {
  key: 'x',
  cursorCoordinate: 100,
  chartScreenOffset: 0,
  tooltipDimension: 100,
  screenDimension: 500,
  offset: 0,
  viewbox: {
    x: 0,
    y: 0
  }
}

const tooltipRestricted: PositionTranslate = {
  key: 'x',
  cursorCoordinate: 450,
  chartScreenOffset: 0,
  tooltipDimension: 100,
  screenDimension: 500,
  offset: 0,
  viewbox: {
    x: 0,
    y: 0
  }
}

const tooltipRestrictedOutside: PositionTranslate = {
  key: 'x',
  cursorCoordinate: 300,
  chartScreenOffset: 0,
  tooltipDimension: 350,
  screenDimension: 500,
  offset: 0,
  viewbox: {
    x: 0,
    y: 0
  }
}

describe('calculateTooltipPosition', () => {
  it('should NOT flip the tooltip, keep the cursor position', () => {
    const translateX = getTooltipTranslate(tooltipUnrestricted)
    const { cursorCoordinate, offset } = tooltipUnrestricted
    const expected = cursorCoordinate + offset

    expect(translateX).toEqual(expected)
  })

  it('should flip the tooltip to the left of the cursor', () => {
    const translateX = getTooltipTranslate(tooltipRestricted)
    const { cursorCoordinate, offset, tooltipDimension } = tooltipRestricted
    const expected = cursorCoordinate - offset - tooltipDimension

    expect(translateX).toEqual(expected)
  })

  it('should translate the tooltip to the chart (top or left) corner when it flips to outside of the screen', () => {
    const translateX = getTooltipTranslate(tooltipRestrictedOutside)
    const { viewbox, key } = tooltipRestricted
    const expected = viewbox[key]

    expect(translateX).toEqual(expected)
  })
})
