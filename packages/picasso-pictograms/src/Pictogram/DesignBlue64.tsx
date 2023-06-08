import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgDesignBlue64 = forwardRef(function SvgDesignBlue64(
  props: Props,
  ref: Ref<SVGSVGElement>
) {
  const { className, style = {}, scale, base, 'data-testid': testId } = props
  const scaledSize = base || SIZE * Math.ceil(scale || 1)

  const svgStyle = {
    minWidth: `${scaledSize}px`,
    minHeight: `${scaledSize}px`,
    ...style,
  }

  return (
    <svg
      fill='none'
      viewBox='0 0 64 64'
      className={className}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <path
        fill='#183A9E'
        d='M35.196 9.922H32v19.915a5.819 5.819 0 0 1 0 11.637v10.08h9.179l5.819-15.899L35.196 9.922ZM48.309 58.069H15.69V63.5H48.31v-5.431Z'
        opacity={0.15}
      />
      <path
        fill='#204ECF'
        d='M61.258 33.969h-1A28.142 28.142 0 0 0 36.629 6.088l.163-.986a29.138 29.138 0 0 1 24.466 28.867ZM3.742 33.969h-1A29.138 29.138 0 0 1 27.208 5.102l.163.986a28.142 28.142 0 0 0-23.629 27.88Z'
      />
      <path
        fill='#204ECF'
        d='M37.211 10.422H26.789V0h10.422v10.422Zm-9.422-1h8.422V1h-8.422v8.422Z'
      />
      <path
        fill='#204ECF'
        d='M48.809 63.5h-1V52.054h-7.346l5.995-16.377-11.582-25.255h-5.751L17.543 35.677l5.994 16.377h-7.345V63.5h-1V51.054h6.914l-5.644-15.42L28.483 9.422h7.034l12.021 26.212-5.644 15.42h6.915V63.5ZM27.29 4.71H9.19v1h18.1v-1ZM54.81 4.71H36.712v1h18.1v-1Z'
      />
      <path
        fill='#204ECF'
        d='M32 41.974a6.32 6.32 0 1 1 6.319-6.319A6.325 6.325 0 0 1 32 41.975Zm0-11.638a5.32 5.32 0 1 0 5.319 5.32A5.325 5.325 0 0 0 32 30.335ZM41.179 51.054H22.82v1H41.18v-1Z'
      />
      <path
        fill='#204ECF'
        d='M32.5 9.922h-1v19.914h1V9.922ZM4.845 10.056a4.845 4.845 0 1 1 0-9.69 4.845 4.845 0 0 1 0 9.69Zm0-8.69a3.845 3.845 0 1 0 0 7.69 3.845 3.845 0 0 0 0-7.69ZM59.155 10.056a4.845 4.845 0 1 1 0-9.69 4.845 4.845 0 0 1 0 9.69Zm0-8.69a3.845 3.845 0 1 0 0 7.69 3.845 3.845 0 0 0 0-7.69Z'
      />
    </svg>
  )
})

SvgDesignBlue64.displayName = 'SvgDesignBlue64'
export default SvgDesignBlue64
