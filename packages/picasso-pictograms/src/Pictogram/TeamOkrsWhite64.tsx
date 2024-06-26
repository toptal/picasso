import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgTeamOkrsWhite64 = forwardRef(function SvgTeamOkrsWhite64(
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
          fill='#000'
          d='M12.5.5C5.87.5.5 5.87.5 12.5s5.37 12 12 12 12-5.37 12-12-5.37-12-12-12m-6 17c0-3.31 2.69-6 6-6-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3c3.31 0 6 2.69 6 6l-.5.5H7zm45 22c-6.63 0-12 5.37-12 12s5.37 12 12 12 12-5.37 12-12-5.37-12-12-12m-6 17c0-3.31 2.69-6 6-6-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3c3.31 0 6 2.69 6 6l-.5.5H46z'
          opacity={0.3}
        />
        <path
          fill='#fff'
          fillRule='evenodd'
          d='M0 12.5C0 5.596 5.596 0 12.5 0S25 5.596 25 12.5 19.404 25 12.5 25 0 19.404 0 12.5M12.5 1C6.149 1 1 6.149 1 12.5S6.149 24 12.5 24 24 18.851 24 12.5 18.851 1 12.5 1M39 12.5C39 5.596 44.596 0 51.5 0S64 5.596 64 12.5 58.404 25 51.5 25 39 19.404 39 12.5M51.5 1C45.149 1 40 6.149 40 12.5S45.149 24 51.5 24 63 18.851 63 12.5 57.851 1 51.5 1'
          clipRule='evenodd'
        />
        <path
          fill='#fff'
          fillRule='evenodd'
          d='M9 8.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0M12.5 6a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5'
          clipRule='evenodd'
        />
        <path
          fill='#fff'
          fillRule='evenodd'
          d='M12.5 12A5.505 5.505 0 0 0 7 17.5v.5H6v-.5c0-3.586 2.914-6.5 6.5-6.5s6.5 2.914 6.5 6.5v.5h-1v-.5c0-3.034-2.466-5.5-5.5-5.5M39 51.5C39 44.596 44.596 39 51.5 39S64 44.596 64 51.5 58.404 64 51.5 64 39 58.404 39 51.5M51.5 40C45.149 40 40 45.149 40 51.5S45.149 63 51.5 63 63 57.851 63 51.5 57.851 40 51.5 40M0 51.5C0 44.596 5.596 39 12.5 39S25 44.596 25 51.5 19.404 64 12.5 64 0 58.404 0 51.5M12.5 40C6.149 40 1 45.149 1 51.5S6.149 63 12.5 63 24 57.851 24 51.5 18.851 40 12.5 40'
          clipRule='evenodd'
        />
        <path
          fill='#fff'
          fillRule='evenodd'
          d='M48 47.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0m3.5-2.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5'
          clipRule='evenodd'
        />
        <path
          fill='#fff'
          fillRule='evenodd'
          d='M51.5 51a5.505 5.505 0 0 0-5.5 5.5v.5h-1v-.5c0-3.586 2.914-6.5 6.5-6.5s6.5 2.914 6.5 6.5v.5h-1v-.5c0-3.034-2.466-5.5-5.5-5.5M12 37V25h1v12zm39 0V25h1v12zM37 13H25v-1h12zm0 39H25v-1h12zM8 52v3H7v-3zm3-2v5h-1v-5zm3-2v7h-1v-7zm3-2v9h-1v-9zM51 3h1v9h6v1h-7zM37.354 28.354 29.5 36.207l-3.854-3.854.708-.707 3.146 3.147 7.147-7.147z'
          clipRule='evenodd'
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

SvgTeamOkrsWhite64.displayName = 'SvgTeamOkrsWhite64'
export default SvgTeamOkrsWhite64
