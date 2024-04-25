import React, { forwardRef } from 'react'
import { useTitleCase } from '@toptal/picasso-shared'
import { toTitleCase } from '@toptal/picasso-utils'
import { twMerge } from 'tailwind-merge'

import { Indicator } from '../Indicator'
import { variantsRootClasses } from './styles'
import type { Props } from './types'

export const TagRectangular = forwardRef<HTMLDivElement, Props>(
  function TagRectangular(props, ref) {
    const {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      children,
      style,
      className,
      titleCase: propsTitleCase,
      variant = 'light-grey',
      indicator,
      ...rest
    } = props

    const titleCase = useTitleCase(propsTitleCase)

    return (
      <div
        {...rest}
        ref={ref}
        className={twMerge(
          'transition-none rounded-sm font-semibold h-4 flex content-center align-middle flex-wrap',
          variantsRootClasses[variant],
          className
        )}
        style={style}
      >
        {indicator && (
          <div className='ml-1 flex content-center flex-wrap'>
            <Indicator color={indicator} />
          </div>
        )}

        <span
          className={twMerge(
            'mx-1 w-max text-2xs text-white',
            variant === 'light-grey' ? 'text-graphite-800' : ''
          )}
        >
          {titleCase ? toTitleCase(children) : children}
        </span>
      </div>
    )
  }
)

TagRectangular.defaultProps = {
  variant: 'light-grey',
}

TagRectangular.displayName = 'TagRectangular'

export default TagRectangular
