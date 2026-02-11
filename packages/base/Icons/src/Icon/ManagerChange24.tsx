import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'
import { twMerge } from '@toptal/picasso-tailwind-merge'

import { getColorClass } from './styles'

const BASE_SIZE = 24

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  scale?: ScaleType
  color?: string
  base?: number
  classes?: {
    root?: string
  }
}
const SvgManagerChange24 = forwardRef(function SvgManagerChange24(
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
      viewBox='0 0 24 24'
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
        d='M4.016.07c.011.038.222.875.467 1.859l.446 1.789-.466 5.127c-.256 2.82-.452 5.142-.435 5.159.018.017.804.472 1.748 1.011 1.643.938 1.721.978 1.82.926.223-.116 3.346-1.908 3.374-1.936.017-.016-.179-2.338-.434-5.16l-.465-5.131.446-1.787c.245-.983.456-1.818.467-1.857C11.004.004 10.82 0 7.5 0S3.996.004 4.016.07m10.909.398-.07.499-.025.187.155.027c.37.063 1.17.274 1.598.422a10.905 10.905 0 0 1 4.318 2.762 11.05 11.05 0 0 1 1.76 2.375l.184.338.438-.219c.24-.121.437-.234.437-.252 0-.058-.564-1.018-.802-1.367a12.371 12.371 0 0 0-3.254-3.214c-1.379-.92-2.763-1.479-4.569-1.845L14.97.156l-.045.312M9.71 1.05c-.01.028-.124.478-.253 1L9.222 3H5.778l-.235-.95a52.812 52.812 0 0 0-.253-1C5.275 1.01 5.734 1 7.5 1s2.225.01 2.21.05m-.611 3.16c.049.421.821 9.009.821 9.132 0 .125-.022.14-1.208.817l-1.208.69-.122-.066c-.067-.037-.617-.35-1.222-.696-1.071-.614-1.1-.633-1.09-.749.071-.846.815-9.043.832-9.168L5.925 4h3.149l.025.21m5.917 3.86c.011.039.222.875.467 1.859l.446 1.789-.466 5.127c-.256 2.82-.452 5.142-.435 5.159.018.017.804.472 1.748 1.011 1.643.938 1.721.978 1.82.926.223-.116 3.346-1.908 3.374-1.936.017-.016-.179-2.338-.434-5.16l-.465-5.131.446-1.787c.245-.983.456-1.818.467-1.857.02-.066-.164-.07-3.484-.07s-3.504.004-3.484.07m5.694.98c-.01.028-.124.477-.253 1l-.235.95h-3.444l-.235-.95a50.639 50.639 0 0 0-.253-1c-.015-.04.444-.05 2.21-.05s2.225.01 2.21.05m-.611 3.16c.049.421.821 9.009.821 9.132 0 .125-.022.14-1.208.817l-1.208.69-.122-.066c-.067-.037-.617-.35-1.222-.696-1.071-.614-1.1-.633-1.09-.749.071-.846.815-9.043.832-9.168l.023-.17h3.149l.025.21M3.14 17.967c-.22.111-.407.209-.416.217-.008.007.121.217.288.465 1.701 2.53 4.256 4.316 7.168 5.01.308.073.625.144.704.158l.144.024.069-.43a9.45 9.45 0 0 1 .087-.496c.014-.052-.022-.072-.173-.094-.651-.096-1.923-.506-2.688-.866a11.163 11.163 0 0 1-4.426-3.794c-.15-.221-.291-.4-.314-.399a3.803 3.803 0 0 0-.443.205'
      />
    </svg>
  )
})

SvgManagerChange24.displayName = 'SvgManagerChange24'
export default SvgManagerChange24
