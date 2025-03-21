import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgDeveloperWhite64 = forwardRef(function SvgDeveloperWhite64(
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
          fill='#fff'
          fillRule='evenodd'
          d='M28.074.244a31.888 31.888 0 0 1 7.873 0l.33.04.084.322c.542 2.04 1.076 4.078 1.605 6.118a25.638 25.638 0 0 1 5.757 2.135c1.712-1.227 3.42-2.444 5.137-3.667l.274-.195.282.185a32.34 32.34 0 0 1 6.027 5.12l.223.242-.138.298c-.891 1.921-1.785 3.84-2.683 5.759a26.177 26.177 0 0 1 3.082 5.388l6.593.536.097.32a32.71 32.71 0 0 1 1.366 7.84l.017.33-6.01 2.805a26.367 26.367 0 0 1-1.07 6.13c1.496 1.493 2.985 2.988 4.468 4.484l.23.233-.126.303a32.46 32.46 0 0 1-3.932 6.897l-.201.27-6.367-1.76a26.304 26.304 0 0 1-4.749 4.018l.57 6.339.03.33-.296.15a31.923 31.923 0 0 1-7.4 2.71L38.82 64l-.19-.277-1.448-2.11c-.713-1.036-1.426-2.074-2.135-3.112a25.96 25.96 0 0 1-6.147 0c-.71 1.038-1.422 2.075-2.134 3.112l-1.449 2.11-.19.277-.327-.076a31.922 31.922 0 0 1-7.4-2.71l-.295-.15.03-.33c.188-2.115.377-4.228.569-6.34a26.156 26.156 0 0 1-4.713-3.996l-6.366 1.76-.201-.27a32.461 32.461 0 0 1-3.932-6.897l-.127-.303.232-.233c1.486-1.493 2.975-2.987 4.467-4.483a26.366 26.366 0 0 1-1.056-6.13L0 31.035l.016-.33a32.715 32.715 0 0 1 1.366-7.86l.098-.32 6.593-.537a26.178 26.178 0 0 1 3.082-5.399c-.901-1.921-1.795-3.84-2.683-5.759l-.138-.298.222-.241a32.345 32.345 0 0 1 6.028-5.12l.282-.186 5.411 3.863a25.637 25.637 0 0 1 5.779-2.126c.531-2.039 1.066-4.078 1.603-6.116l.085-.322.33-.041Zm.451.937a2125.59 2125.59 0 0 0-1.592 6.078l-.075.29-.293.066a24.653 24.653 0 0 0-6.1 2.244l-.268.142-5.353-3.821a31.365 31.365 0 0 0-5.34 4.538c.883 1.906 1.772 3.813 2.667 5.722l.126.27-.18.236a25.191 25.191 0 0 0-3.25 5.695l-.114.28-6.524.53a31.733 31.733 0 0 0-1.211 6.975l5.947 2.776.013.3c.09 2.194.464 4.367 1.113 6.464l.087.283-.21.21a5912.39 5912.39 0 0 0-4.44 4.455c.93 2.165 2.1 4.216 3.486 6.116l6.297-1.74.203.223a25.172 25.172 0 0 0 4.974 4.219l.25.16-.027.297c-.19 2.099-.38 4.199-.567 6.3a30.938 30.938 0 0 0 6.552 2.4l1.26-1.835c.768-1.118 1.536-2.235 2.3-3.355l.17-.25.3.04c2.156.282 4.339.282 6.494 0l.3-.04.17.25c.765 1.12 1.533 2.237 2.3 3.355.42.61.841 1.222 1.261 1.835a30.935 30.935 0 0 0 6.552-2.4c-.187-2.098-.376-4.198-.567-6.3l-.027-.297.25-.16a25.324 25.324 0 0 0 5.011-4.24l.203-.224 6.297 1.74a31.476 31.476 0 0 0 3.486-6.116 1171.791 1171.791 0 0 0-4.44-4.454l-.211-.21.089-.285a25.382 25.382 0 0 0 1.128-6.464l.013-.298 5.947-2.777a31.726 31.726 0 0 0-1.211-6.953l-6.524-.53-.114-.28a25.193 25.193 0 0 0-3.25-5.684l-.18-.236.126-.27a1893 1893 0 0 0 2.667-5.723 31.36 31.36 0 0 0-5.341-4.538 1920.091 1920.091 0 0 0-5.105 3.645l-.247.177-.27-.143a24.656 24.656 0 0 0-6.078-2.254l-.292-.067-.076-.29c-.524-2.026-1.054-4.051-1.591-6.077a30.903 30.903 0 0 0-6.97 0Z'
          clipRule='evenodd'
        />
        <path
          fill='#231F20'
          d='M50.617 32.363c0 10.391-8.329 18.815-18.604 18.815-10.275 0-18.604-8.424-18.604-18.815 0-10.39 8.33-18.814 18.604-18.814 10.275 0 18.605 8.423 18.605 18.814Z'
          opacity={0.3}
        />
        <path
          fill='#fff'
          fillRule='evenodd'
          d='m20.78 32.364 4.92-4.98-.701-.691-5.602 5.67 5.602 5.666.7-.691-4.919-4.974ZM39.017 26.692l5.607 5.672-5.608 5.665-.7-.692 4.924-4.974-4.923-4.98.7-.69ZM28.272 40.67l6.559-16.974.918.355-6.559 16.973-.918-.354Z'
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

SvgDeveloperWhite64.displayName = 'SvgDeveloperWhite64'
export default SvgDeveloperWhite64
