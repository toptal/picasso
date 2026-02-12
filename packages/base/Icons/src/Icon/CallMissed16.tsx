import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'
import { twMerge } from '@toptal/picasso-tailwind-merge'

import { getColorClass } from './styles'

const BASE_SIZE = 16

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  scale?: ScaleType
  color?: string
  base?: number
  classes?: {
    root?: string
  }
}
const SvgCallMissed16 = forwardRef(function SvgCallMissed16(
  props: Props,
  ref: Ref<SVGSVGElement>
) {
  const {
    classes,
    className,
    style = {},
    color,
    scale,
    base,
    'data-testid': testId,
  } = props
  const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1)
  const svgStyle = {
    minWidth: `${scaledSize}px`,
    minHeight: `${scaledSize}px`,
    ...style,
  }

  return (
    <svg
      fill='none'
      viewBox='0 0 16 16'
      className={twMerge(
        'fill-current inline-block text-inherit h-[1em] align-[-.125em]',
        classes?.root,
        className,
        getColorClass(color)
      )}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <path
        fillRule='evenodd'
        d='M10.987 1.507V2h2.333l-2.653 2.653-2.654 2.654L5.007 4.3 2 1.294l-.353.353L1.293 2l3.36 3.36 3.36 3.36 2.994-2.993L14 2.733v2.282l.5-.008L15 5l.007-1.993.007-1.994H10.987v.494m-3.694 8.511a17.462 17.462 0 0 0-5.741 1.237c-.513.208-.64.287-.926.572a1.896 1.896 0 0 0-.526.84l-.086.253-.009 1.104c-.007 1.047-.005 1.113.046 1.28.066.212.211.412.386.529C.685 16 .682 16 2.335 16c1.449 0 1.506-.002 1.681-.056.156-.048.206-.081.359-.233.286-.287.3-.343.313-1.209l.01-.712.071-.015a19.483 19.483 0 0 1 5.084-.186c.39.039 1.276.159 1.391.188.058.014.058.022.068.725.013.866.027.922.314 1.209.155.155.201.185.364.234.182.056.221.057 1.732.049 1.533-.007 1.546-.008 1.673-.067a.997.997 0 0 0 .556-.627c.044-.142.049-.26.049-1.149 0-.565-.012-1.065-.028-1.164a2.053 2.053 0 0 0-.61-1.176c-.274-.274-.439-.371-1.026-.603-2.199-.869-4.742-1.298-7.043-1.19m2.294 1.06c1.487.161 2.765.456 4.066.94.875.326 1.037.432 1.221.805l.099.201.008.995.008.994H12.32v-1.04c0-.572-.005-1.04-.011-1.04-.006 0-.303-.047-.66-.106-1.429-.233-2.071-.293-3.329-.312-1.201-.019-1.978.024-3.017.165-.295.04-1.422.217-1.55.243l-.073.015v2.075H1.013v-.941c0-.788.007-.966.043-1.087.106-.357.321-.573.754-.756a16.392 16.392 0 0 1 1.51-.535c1.233-.368 2.254-.551 3.707-.664.351-.027 2.18.007 2.56.048'
      />
    </svg>
  )
})

SvgCallMissed16.displayName = 'SvgCallMissed16'
export default SvgCallMissed16
