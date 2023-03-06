import React, { forwardRef, Ref } from 'react'
import { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgCertifiedDocumentWhite64Svg = forwardRef(
  function SvgCertifiedDocumentWhite64Svg(
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
            opacity={0.3}
            d='M39.205 58.8v-3.863L.5 54.998v3.803A4.7 4.7 0 0 0 5.199 63.5h38.705a4.7 4.7 0 0 1-4.7-4.7ZM48.602 32.843a8.88 8.88 0 1 0 0-17.761 8.88 8.88 0 0 0 0 17.76Z'
            fill='#231F20'
          />
          <path
            d='M10.398 54.983h-1V5.2A5.205 5.205 0 0 1 14.595 0h38.705v1a4.203 4.203 0 0 0-4.199 4.2v3.863h-1V5.199A5.196 5.196 0 0 1 50.24 1H14.596a4.203 4.203 0 0 0-4.198 4.2v49.783Z'
            fill='#fff'
          />
          <path
            d='M43.903 64H5.2A5.205 5.205 0 0 1 0 58.8V54.5l39.705-.063v4.365a4.199 4.199 0 0 0 8.397 0V45.01h1V58.8a5.205 5.205 0 0 1-5.199 5.2ZM1 55.497v3.304A4.204 4.204 0 0 0 5.199 63H40.84a5.197 5.197 0 0 1-2.136-4.2v-3.362L1 55.498ZM41.815 38.127h-25.11v1h25.11v-1ZM36.056 31.5H16.704v1h19.352v-1ZM33.77 24.873H16.704v1H33.77v-1ZM34.644 18.246h-17.94v1h17.94v-1ZM30.377 44.754H16.704v1h13.673v-1Z'
            fill='#fff'
          />
          <path
            d='M48.602 39.361A15.399 15.399 0 1 1 64 23.962a15.416 15.416 0 0 1-15.398 15.4Zm0-29.798A14.399 14.399 0 1 0 63 23.963a14.415 14.415 0 0 0-14.398-14.4Z'
            fill='#fff'
          />
          <path
            d='m55.889 49.23-7.287-3.661-7.287 3.661V37.228h1v10.381l6.287-3.159 6.287 3.159V37.228h1V49.23Z'
            fill='#fff'
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

SvgCertifiedDocumentWhite64Svg.displayName = 'SvgCertifiedDocumentWhite64Svg'
export default SvgCertifiedDocumentWhite64Svg
