import React, { forwardRef, Ref } from 'react'
import { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgCertifiedDocumentBlue64 = forwardRef(
  function SvgCertifiedDocumentBlue64(props: Props, ref: Ref<SVGSVGElement>) {
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
            d='M39.205 58.8v-3.863L.5 54.998v3.803A4.7 4.7 0 0 0 5.198 63.5h38.705a4.7 4.7 0 0 1-4.698-4.7ZM48.602 32.843a8.88 8.88 0 1 0 0-17.761 8.88 8.88 0 0 0 0 17.76Z'
            fill='#183A9E'
          />
          <path
            d='M10.397 54.983h-1V5.2A5.205 5.205 0 0 1 14.597 0H53.3v1a4.203 4.203 0 0 0-4.2 4.2v3.863h-1V5.199A5.196 5.196 0 0 1 50.24 1H14.596a4.203 4.203 0 0 0-4.199 4.2v49.783Z'
            fill='#204ECF'
          />
          <path
            d='M43.903 64H5.2a5.205 5.205 0 0 1-5.2-5.2V54.5l39.706-.063v4.365a4.199 4.199 0 1 0 8.397 0V45.01h1V58.8a5.205 5.205 0 0 1-5.199 5.2ZM1 55.497v3.304A4.204 4.204 0 0 0 5.199 63H40.84a5.196 5.196 0 0 1-2.136-4.2v-3.362L1 55.498ZM41.815 38.127H16.704v1h25.111v-1ZM36.056 31.5H16.704v1h19.352v-1ZM33.77 24.873H16.704v1H33.77v-1ZM34.644 18.246h-17.94v1h17.94v-1ZM30.377 44.754H16.704v1h13.673v-1Z'
            fill='#204ECF'
          />
          <path
            d='M48.602 39.361A15.399 15.399 0 1 1 64 23.962a15.416 15.416 0 0 1-15.398 15.4Zm0-29.798A14.399 14.399 0 1 0 63 23.963a14.414 14.414 0 0 0-14.398-14.4Z'
            fill='#204ECF'
          />
          <path
            d='m55.889 49.23-7.287-3.661-7.287 3.661V37.228h1v10.381l6.287-3.159 6.287 3.159V37.228h1V49.23Z'
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
  }
)

SvgCertifiedDocumentBlue64.displayName = 'SvgCertifiedDocumentBlue64'
export default SvgCertifiedDocumentBlue64
