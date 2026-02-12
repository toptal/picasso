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
const SvgManagerChange16 = forwardRef(function SvgManagerChange16(
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
        d='m2.011.047.45 1.35.435 1.304-.447 3.123a685.877 685.877 0 0 0-.448 3.151c-.001.015.562.253 1.249.528l1.25.5 1.243-.498c1.1-.44 1.244-.504 1.244-.554 0-.032-.2-1.452-.443-3.156l-.443-3.099.443-1.328c.243-.73.443-1.337.443-1.348C6.987.009 5.864 0 4.492 0 2.127 0 1.997.002 2.011.047m6.976.031c0 .008-.024.201-.054.429-.078.604-.096.545.18.585.332.048.93.202 1.274.326a7.769 7.769 0 0 1 2.039 1.16c.29.233.763.706.996.996.217.268.607.85.738 1.101.051.098.102.178.114.178.04.001.873-.427.873-.448 0-.044-.384-.691-.555-.937A8.103 8.103 0 0 0 11.269.699 9.483 9.483 0 0 0 9.787.203c-.353-.078-.8-.148-.8-.125m-3.394.969-.165.493-.152.46H3.719l-.164-.493-.164-.494h1.107c.875 0 1.105.007 1.095.034m-.09 4.56.383 2.676.013.083-.678.271c-.373.148-.698.27-.723.27-.024 0-.349-.122-.723-.272-.613-.244-.679-.276-.668-.326.007-.031.175-1.202.373-2.602.199-1.401.368-2.58.376-2.62l.015-.074h1.263l.369 2.594m3.51.413c0 .011.2.618.443 1.348l.443 1.328-.443 3.099a346.55 346.55 0 0 0-.443 3.156c0 .05.144.114 1.244.554l1.243.498 1.243-.497c.684-.274 1.247-.5 1.25-.504.004-.003-.196-1.425-.444-3.159l-.45-3.152.448-1.346L13.996 6h-2.491c-1.371 0-2.492.009-2.492.02m3.432 1.487-.164.494-.784-.007-.784-.007-.156-.48a28.28 28.28 0 0 1-.156-.487 42.79 42.79 0 0 1 1.103-.007h1.105l-.164.494m-.311 1.526c.001.011.172 1.216.382 2.678l.381 2.657-.682.27c-.375.148-.7.27-.722.269-.022 0-.344-.122-.716-.271l-.676-.271.013-.082.383-2.676.369-2.594h.634c.348 0 .634.009.634.02M1.678 11.951a7.57 7.57 0 0 0-.421.276c-.031.029-.011.073.125.27C2.617 14.3 4.568 15.549 6.68 15.89c.176.029.322.05.325.047.01-.01.115-.856.115-.925 0-.065-.01-.069-.228-.101a8.04 8.04 0 0 1-1.263-.326 7.052 7.052 0 0 1-3.409-2.643l-.158-.232-.384.241'
      />
    </svg>
  )
})

SvgManagerChange16.displayName = 'SvgManagerChange16'
export default SvgManagerChange16
