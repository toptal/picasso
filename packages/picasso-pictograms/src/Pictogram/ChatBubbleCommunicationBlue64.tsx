import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgChatBubbleCommunicationBlue64 = forwardRef(
  function SvgChatBubbleCommunicationBlue64(
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
            fill='#183A9C'
            d='M14.482 35.456c-7.72 0-13.983 6.262-13.983 13.982s6.263 13.983 13.983 13.983c7.72 0 13.982-6.263 13.982-13.983 0-7.72-6.262-13.982-13.982-13.982ZM7.49 56.429a6.986 6.986 0 0 1 6.99-6.99 3.994 3.994 0 0 1-3.994-3.996 3.994 3.994 0 0 1 3.995-3.995 3.994 3.994 0 0 1 3.995 3.995 3.994 3.994 0 0 1-3.995 3.995 6.986 6.986 0 0 1 6.991 6.991l-.5.5H7.99l-.5-.5ZM42.447 56.43a6.986 6.986 0 0 1 6.991-6.992 3.994 3.994 0 0 1-3.995-3.995 3.994 3.994 0 0 1 3.995-3.995 3.994 3.994 0 0 1 3.995 3.995 3.994 3.994 0 0 1-3.995 3.995 6.986 6.986 0 0 1 6.991 6.991l-.499.5H42.946l-.5-.5ZM23.97 14.981a1.997 1.997 0 1 0 0-3.995 1.997 1.997 0 0 0 0 3.995ZM39.95 14.981a1.997 1.997 0 1 0 0-3.995 1.997 1.997 0 0 0 0 3.995ZM31.96 14.981a1.997 1.997 0 1 0 0-3.995 1.997 1.997 0 0 0 0 3.995Z'
            opacity={0.15}
          />
          <path
            stroke='#204ECD'
            strokeMiterlimit={10}
            d='M49.438 63.42c7.722 0 13.983-6.26 13.983-13.982 0-7.722-6.26-13.982-13.983-13.982-7.722 0-13.982 6.26-13.982 13.982 0 7.722 6.26 13.983 13.982 13.983Z'
          />
          <path
            stroke='#204ECD'
            strokeMiterlimit={10}
            d='M14.482 49.438a3.995 3.995 0 1 0 0-7.99 3.995 3.995 0 0 0 0 7.99Z'
          />
          <path
            stroke='#204ECD'
            strokeLinecap='square'
            strokeMiterlimit={10}
            d='M7.49 56.43a6.986 6.986 0 0 1 6.992-6.992 6.986 6.986 0 0 1 6.991 6.991'
          />
          <path
            stroke='#204ECD'
            strokeMiterlimit={10}
            d='M49.438 49.438a3.995 3.995 0 1 0 0-7.99 3.995 3.995 0 0 0 0 7.99Z'
          />
          <path
            stroke='#204ECD'
            strokeLinecap='square'
            strokeMiterlimit={10}
            d='M42.447 56.43a6.986 6.986 0 0 1 6.991-6.992 6.986 6.986 0 0 1 6.991 6.991'
          />
          <path
            stroke='#204ECD'
            strokeMiterlimit={10}
            d='M14.482 63.42c7.722 0 13.982-6.26 13.982-13.982 0-7.722-6.26-13.982-13.982-13.982-7.722 0-13.983 6.26-13.983 13.982 0 7.722 6.26 13.983 13.983 13.983ZM48.44.5H15.48v24.968h9.988l6.492 6.492 6.492-6.492h9.988V.5Z'
          />
        </g>
        <defs>
          <clipPath id='a'>
            <path fill='#fff' d='M0 0h64v64H0z' />
          </clipPath>
        </defs>
      </svg>
    )
  }
)

SvgChatBubbleCommunicationBlue64.displayName =
  'SvgChatBubbleCommunicationBlue64'
export default SvgChatBubbleCommunicationBlue64
