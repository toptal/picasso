import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgCoworkingWhite64 = forwardRef(function SvgCoworkingWhite64(
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
      <g clipPath='url(#a)'>
        <path
          fill='#231F20'
          d='M28.357 28.278H13.822v10.834h14.535V28.278ZM50.457 28.278H35.922v10.834h14.535V28.278Z'
          opacity={0.3}
        />
        <path fill='#fff' d='M63.382 62.763H.618v1h62.764v-1Z' />
        <path
          fill='#fff'
          d='M60.518 63.263h-1v-15.5a2.866 2.866 0 0 0-2.862-2.863H7.343a2.866 2.866 0 0 0-2.863 2.862v15.501h-1v-15.5A3.867 3.867 0 0 1 7.343 43.9h49.313a3.867 3.867 0 0 1 3.862 3.862v15.501ZM50.957 39.612H35.422V27.778h15.535v11.834Zm-14.535-1h13.535v-9.834H36.422v9.834Z'
        />
        <path
          fill='#fff'
          d='M43.69 39.112h-1V44.4h1v-5.288ZM50.276 50.336h-1v7.753h1v-7.753Z'
        />
        <path
          fill='#fff'
          d='M44.065 52.95h-1v-1.306a1.81 1.81 0 0 1 1.808-1.808h8.312a1.744 1.744 0 0 0 1.741-1.742V34.777h1v13.317a2.745 2.745 0 0 1-2.741 2.742h-8.312a.809.809 0 0 0-.808.808v1.307ZM55.687 63.5h-1a4.91 4.91 0 0 0-9.822 0h-1a5.911 5.911 0 0 1 11.822 0ZM28.857 39.612H13.322V27.778h15.535v11.834Zm-14.535-1h13.535v-9.834H14.322v9.834Z'
        />
        <path
          fill='#fff'
          d='M21.59 39.112h-1V44.4h1v-5.288ZM14.723 50.336h-1v7.753h1v-7.753Z'
        />
        <path
          fill='#fff'
          d='M20.934 52.95h-1v-1.306a.808.808 0 0 0-.808-.808h-8.312a2.744 2.744 0 0 1-2.741-2.742V34.777h1v13.317a1.744 1.744 0 0 0 1.741 1.742h8.313a1.81 1.81 0 0 1 1.807 1.808v1.307ZM20.134 63.5h-1a4.91 4.91 0 0 0-9.822 0h-1a5.91 5.91 0 0 1 11.822 0ZM19.515 19.396H5.529v-.5a6.993 6.993 0 0 1 13.986 0v.5Zm-12.966-1h11.945a5.993 5.993 0 0 0-11.945 0ZM38.975 19.43l-13.986-.068.003-.5a7.002 7.002 0 0 1 6.993-6.959h.034a6.992 6.992 0 0 1 6.958 7.027l-.002.5Zm-12.96-1.063 11.944.058a5.993 5.993 0 0 0-5.945-5.522h-.03a6.002 6.002 0 0 0-5.97 5.464ZM58.468 19.43l-13.985-.068.002-.5a7.002 7.002 0 0 1 6.993-6.959h.034a6.992 6.992 0 0 1 6.959 7.027l-.003.5Zm-12.96-1.063 11.945.058a5.994 5.994 0 0 0-5.946-5.522h-.029a6.002 6.002 0 0 0-5.97 5.464Z'
        />
        <path
          fill='#fff'
          d='M13.021.5h-1v11.903h1V.5ZM32.5.5h-1v11.903h1V.5ZM51.977.5h-1v11.903h1V.5Z'
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

SvgCoworkingWhite64.displayName = 'SvgCoworkingWhite64'
export default SvgCoworkingWhite64
