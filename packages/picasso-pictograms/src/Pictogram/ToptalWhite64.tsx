import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgToptalWhite64 = forwardRef(function SvgToptalWhite64(
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
          fillRule='evenodd'
          clipRule='evenodd'
          d='M46.692 29.643 28.76 11.673l-4.17 4.153 6.098 6.113-13.38 13.334L35.3 53.297l4.116-4.1-6.15-6.166 13.425-13.388Zm-17.16 8.828a.603.603 0 0 1-.366 0 1.013 1.013 0 0 1-.444-.313l-2.425-2.433a1.04 1.04 0 0 1-.314-.444.601.601 0 0 1 0-.367c.062-.174.17-.327.314-.444l7.642-7.627a.938.938 0 0 1 .444-.306.603.603 0 0 1 .367 0c.174.062.327.17.444.314l2.425 2.432c.143.115.25.27.306.444a.603.603 0 0 1 0 .367c-.062.174-.17.327-.314.444l-7.642 7.627a.952.952 0 0 1-.436.306Z'
          fill='#231F20'
        />
        <path
          d='M35.3 54.004 16.6 35.273l13.38-13.335-6.097-6.112 4.878-4.86L47.4 29.643 33.973 43.032l6.151 6.166-4.824 4.806Zm-17.285-18.73 17.287 17.317 3.407-3.395-6.15-6.166 13.426-13.388L28.76 12.379l-3.46 3.449 6.096 6.112-13.38 13.334Z'
          fill='#fff'
        />
        <path
          d='M29.35 39c-.114 0-.225-.018-.333-.051a1.489 1.489 0 0 1-.648-.437l-2.426-2.434c-.2-.174-.35-.396-.437-.646-.069-.217-.07-.45 0-.667.086-.251.237-.475.438-.649l7.642-7.627c.178-.208.412-.36.675-.437.208-.063.43-.06.638.007.251.087.475.238.649.438l2.425 2.433c.207.179.359.413.437.675.062.209.06.43-.007.638a1.49 1.49 0 0 1-.438.649l-7.643 7.627c-.17.2-.392.348-.64.43-.108.033-.22.05-.333.05Zm5.25-11.987a.547.547 0 0 0-.307.183l-7.643 7.628c-.167.167-.18.208-.19.24.008.094.023.14.19.306l2.426 2.435c.167.167.206.179.238.189h.07c.037-.012.079-.025.225-.176l7.65-7.634c.166-.167.179-.207.19-.24a.545.545 0 0 0-.183-.307l-2.426-2.433c-.167-.167-.208-.18-.24-.19Z'
          fill='#fff'
        />
        <path
          d='M32 64.485a32 32 0 1 1 32-32 32.036 32.036 0 0 1-32 32Zm0-63a31 31 0 1 0 31 31 31.035 31.035 0 0 0-31-31Z'
          fill='#fff'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' transform='translate(0 .485)' d='M0 0h64v64H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgToptalWhite64.displayName = 'SvgToptalWhite64'
export default SvgToptalWhite64
