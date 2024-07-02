import React from 'react'
import type { BaseProps, SizeType } from '@toptal/picasso-shared'
import { twJoin } from '@toptal/picasso-tailwind-merge'

import {
  getBackgroundFillClass,
  getBordersStrokeClass,
  rootClassBySize,
  svgClassBySize,
} from './styles'
import { getShapes } from './utils'

/**
 * For measuring, pixel values are used because SVG's "d" attribute works with percentages and pixels only
 */
const BASE_FONT_SIZE = 16

const SETTINGS = {
  xxsmall: {
    dimensions: 2 * BASE_FONT_SIZE,
    cornerSize: 0.5 * BASE_FONT_SIZE,
  },
  xsmall: {
    dimensions: 2.5 * BASE_FONT_SIZE,
    cornerSize: 0.5 * BASE_FONT_SIZE,
  },
  small: {
    dimensions: 5 * BASE_FONT_SIZE,
    cornerSize: 1 * BASE_FONT_SIZE,
  },
  medium: {
    dimensions: 7.5 * BASE_FONT_SIZE,
    cornerSize: 1.5 * BASE_FONT_SIZE,
  },
  large: {
    dimensions: 10 * BASE_FONT_SIZE,
    cornerSize: 1.5 * BASE_FONT_SIZE,
  },
} as const

export const AVATAR_DROPZONE_SVG_SHAPES = {
  xxsmall: getShapes(SETTINGS.xxsmall),
  xsmall: getShapes(SETTINGS.xsmall),
  small: getShapes(SETTINGS.small),
  medium: getShapes(SETTINGS.medium),
  large: getShapes(SETTINGS.large),
} as const

export type Size = SizeType<'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large'>

export interface Props extends BaseProps {
  size?: SizeType<'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large'>
  isDragActive?: boolean
  disabled?: boolean
  error?: boolean
  focused?: boolean
  hovered?: boolean
}

export const DropzoneSvg = (props: Props) => {
  const {
    size = 'small',
    disabled,
    error,
    focused,
    hovered,
    isDragActive,
    'data-testid': dataTestId,
  } = props

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const shapes = AVATAR_DROPZONE_SVG_SHAPES[size!]

  return (
    <div
      className={twJoin(
        '[pointer-events:unset] relative bg-transparent',
        rootClassBySize[size]
      )}
      data-testid={dataTestId}
    >
      <svg
        className={twJoin('m-[-3px]', svgClassBySize[size])}
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          className={twJoin(
            'transition-colors duration-350 ease-out',
            'active:fill-blue-500/[0.24]',
            getBackgroundFillClass({ hovered, isDragActive, disabled })
          )}
          fillRule='evenodd'
          clipRule='evenodd'
          d={shapes.background}
        />
        <path
          className={twJoin(
            'hidden',
            focused && !isDragActive && '[display:initial]',
            error ? 'stroke-red-500' : 'stroke-blue-500'
          )}
          fillRule='evenodd'
          clipRule='evenodd'
          d={shapes.outline}
          strokeOpacity='.48'
          strokeWidth='3'
          strokeLinejoin='round'
        />
        <path
          className={twJoin(
            'transition-[stroke] duration-350',
            getBordersStrokeClass({ hovered, error })
          )}
          fillRule='evenodd'
          clipRule='evenodd'
          d={shapes.borders}
          strokeDasharray='3 3'
        />
      </svg>
    </div>
  )
}

DropzoneSvg.displayName = 'DropzoneSvg'

DropzoneSvg.defaultProps = {
  size: 'small',
}

export default DropzoneSvg
