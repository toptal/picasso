import React, { forwardRef, Ref } from 'react'
import { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgTeamworkBlue64 = forwardRef(function SvgTeamworkBlue64(
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
      viewBox='0 0 65 64'
      fill='none'
      className={className}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <g clipPath='url(#a)'>
        <path
          opacity={0.15}
          d='M54.318 58.715a9.058 9.058 0 0 1-2.623-6.383 4.986 4.986 0 0 1 .506-2.29l9.261-2.456a9.465 9.465 0 0 0-6.795-2.865 9.658 9.658 0 0 0-8.528 4.686l-28.052-.017A9.492 9.492 0 0 0 .683 51.99l9.364-2.483a9.057 9.057 0 0 1 2.623 6.384 4.986 4.986 0 0 1-.506 2.29l-9.261 2.455A9.468 9.468 0 0 0 9.698 63.5a9.66 9.66 0 0 0 8.528-4.685l28.052.015a9.493 9.493 0 0 0 17.405-2.598l-9.365 2.483ZM47.933 16.101a7.8 7.8 0 1 0 0-15.601 7.8 7.8 0 0 0 0 15.601ZM47.933 19.16a15.75 15.75 0 0 0-15.75 15.75h31.5a15.75 15.75 0 0 0-15.75-15.75Z'
          fill='#183A9E'
        />
        <path
          d='M54.451 64a10.05 10.05 0 0 1-8.454-4.67l-27.481-.016A10.157 10.157 0 0 1 9.698 64a9.923 9.923 0 0 1-7.153-3.015l-.599-.614 9.869-2.616a4.695 4.695 0 0 0 .355-1.866 8.479 8.479 0 0 0-2.285-5.823L0 52.686l.196-.815a9.993 9.993 0 0 1 18.171-2.981l27.483.017a10.157 10.157 0 0 1 8.818-4.686 9.916 9.916 0 0 1 7.152 3.016l.599.613-9.868 2.616a4.697 4.697 0 0 0-.356 1.865 8.478 8.478 0 0 0 2.285 5.824l9.885-2.62-.196.815A9.965 9.965 0 0 1 54.451 64Zm-36.52-5.686 28.631.016.146.245a8.994 8.994 0 0 0 16.248-1.633l-8.796 2.332-.204-.214a9.494 9.494 0 0 1-2.76-6.729 5.445 5.445 0 0 1 .563-2.523l.102-.194 8.599-2.28a8.911 8.911 0 0 0-5.792-2.113 9.11 9.11 0 0 0-8.092 4.428l-.142.258-28.632-.017-.146-.245A8.993 8.993 0 0 0 1.41 51.279l8.796-2.332.204.213a9.496 9.496 0 0 1 2.76 6.73 5.442 5.442 0 0 1-.563 2.523l-.102.193-8.599 2.28A8.92 8.92 0 0 0 9.698 63a9.11 9.11 0 0 0 8.091-4.428l.143-.258ZM16.433 16.602a8.3 8.3 0 1 1 8.3-8.301 8.31 8.31 0 0 1-8.3 8.3Zm0-15.602a7.3 7.3 0 1 0 7.3 7.3 7.31 7.31 0 0 0-7.3-7.3ZM32.683 34.91h-1a15.25 15.25 0 1 0-30.5 0h-1a16.25 16.25 0 1 1 32.5 0ZM47.933 16.602a8.3 8.3 0 1 1 8.3-8.301 8.31 8.31 0 0 1-8.3 8.3Zm0-15.602a7.3 7.3 0 1 0 7.3 7.3 7.31 7.31 0 0 0-7.3-7.3Z'
          fill='#204ECF'
        />
        <path
          d='M64.183 34.91h-1a15.25 15.25 0 1 0-30.5 0h-1a16.25 16.25 0 0 1 32.5 0Z'
          fill='#204ECF'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' d='M0 0h64.365v64H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgTeamworkBlue64.displayName = 'SvgTeamworkBlue64'
export default SvgTeamworkBlue64
