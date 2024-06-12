import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgReportWhite64 = forwardRef(function SvgReportWhite64(
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
      <path fill='#000' d='M27 19H14v-2h13z' opacity={0.3} />
      <path fill='#000' d='M56 55h-6V20L38 8H15V1h41z' opacity={0.3} />
      <path fill='#000' d='M38 20h11l-11 3z' opacity={0.3} />
      <path
        fill='#fff'
        fillRule='evenodd'
        d='M14 0h43v56h-7v8H7V8h31.707L50 19.293V55h6V1H15v7h-1zm35 20v43H8V9h30v11zm-.707-1L39 9.707V19z'
        clipRule='evenodd'
      />
      <path
        fill='#fff'
        fillRule='evenodd'
        d='M38 25H14v-1h24zm0 3H14v-1h24zm0 3H14v-1h24zm0 3H14v-1h24zm-15 3h-9v-1h9zm-2 11.5a7.5 7.5 0 1 1 15 0 7.5 7.5 0 0 1-15 0m7.5-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13'
        clipRule='evenodd'
      />
      <path
        fill='#fff'
        fillRule='evenodd'
        d='M28 43h1v5h3v1h-4z'
        clipRule='evenodd'
      />
    </svg>
  )
})

SvgReportWhite64.displayName = 'SvgReportWhite64'
export default SvgReportWhite64
