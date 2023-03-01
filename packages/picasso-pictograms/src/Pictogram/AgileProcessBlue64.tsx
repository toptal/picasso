import React, { forwardRef, Ref } from 'react'
import { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgAgileProcessBlue64 = forwardRef(function SvgAgileProcessBlue64(
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
      viewBox='0 0 64 64'
      fill='none'
      className={className}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <g clipPath='url(#a)'>
        <path
          opacity={0.15}
          d='M32 13.447a18.558 18.558 0 0 1 17.645 12.82l7.156 1.076 5.158-5.08A31.508 31.508 0 0 0 32 .5l3.237 6.474L32 13.447Z'
          fill='#183A9E'
        />
        <path
          opacity={0.15}
          d='M63.5 32a31.46 31.46 0 0 0-1.541-9.737l-5.158 5.08-7.156-1.077a18.552 18.552 0 0 1-6.739 20.74l1.188 7.142 6.42 3.331A31.45 31.45 0 0 0 63.5 32Z'
          fill='#183A9E'
        />
        <path
          opacity={0.15}
          d='M42.906 47.005a18.538 18.538 0 0 1-21.805.005l-6.426 3.337-1.185 7.135a31.474 31.474 0 0 0 37.023-.003l-6.419-3.331-1.188-7.143Z'
          fill='#183A9E'
        />
        <path
          d='m56.975 27.875-7.71-1.16-.095-.294A18.006 18.006 0 0 0 32 13.947h-.809l3.488-6.973L31.19 0H32A31.917 31.917 0 0 1 62.435 22.11l.095.293-5.555 5.473Zm-6.953-2.058 6.607.995 4.758-4.687A30.914 30.914 0 0 0 32.814 1.011l2.982 5.963-2.995 5.99a18.997 18.997 0 0 1 17.221 12.853Z'
          fill='#204ECF'
        />
        <path
          d='m14.58 27.194-5.557-5.469-7.71 1.164.25-.77A31.914 31.914 0 0 1 32 0h.309l3.487 6.974-3.487 6.973H32a18.002 18.002 0 0 0-17.17 12.478l-.25.77Zm-5.21-6.532 4.77 4.698a18.997 18.997 0 0 1 17.55-12.41l2.989-5.976-2.988-5.972A30.913 30.913 0 0 0 2.774 21.657l6.595-.995Z'
          fill='#204ECF'
        />
        <path
          d='m13.85 58.363-.654-.477A31.996 31.996 0 0 1 1.562 22.12l.096-.294 7.711-1.163 5.556 5.469-.096.294a18.05 18.05 0 0 0 6.566 20.18l.654.476-6.922 3.595-1.276 7.687ZM2.42 22.722a30.995 30.995 0 0 0 10.712 33.867l1.09-6.57 5.948-3.09a19.05 19.05 0 0 1-6.386-20.517l-4.76-4.687-6.604.997ZM50.558 58.066l-6.916-3.59-1.28-7.694.25-.181a18.053 18.053 0 0 0 6.558-20.18l-.25-.77 7.709 1.16 5.556-5.471.25.769a31.999 31.999 0 0 1-11.627 35.775l-.25.182Zm-6.012-4.247 5.922 3.074a30.997 30.997 0 0 0 11.257-33.697l-4.75 4.68-6.623-.998a19.053 19.053 0 0 1-6.903 20.347l1.097 6.594Z'
          fill='#204ECF'
        />
        <path
          d='M32 64a31.757 31.757 0 0 1-18.804-6.114l-.25-.181 1.277-7.686 6.921-3.596.25.183a18.038 18.038 0 0 0 21.218-.005l.655-.477 1.279 7.695 6.916 3.59-.654.475A31.758 31.758 0 0 1 32 64Zm-17.966-6.742a30.978 30.978 0 0 0 35.522.287l-5.914-3.068-1.099-6.61a19.04 19.04 0 0 1-21.484-.272l-5.932 3.08-1.093 6.583Z'
          fill='#204ECF'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' d='M0 0h64v64H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgAgileProcessBlue64.displayName = 'SvgAgileProcessBlue64'
export default SvgAgileProcessBlue64
