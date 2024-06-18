import React, { forwardRef } from 'react'
import { useTitleCase } from '@toptal/picasso-shared'
import { Typography } from '@toptal/picasso-typography'
import { twJoin, twMerge } from '@toptal/picasso-tailwind-merge'

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
          'text-lg transition-none rounded-sm font-semibold h-4 inline-flex content-center justify-center align-middle',
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

        <Typography
          size='xxsmall'
          weight='semibold'
          noWrap
          className={twJoin(
            'mx-1 w-max',
            variant === 'light-grey' ? 'text-graphite-800' : 'text-white'
          )}
          titleCase={titleCase}
        >
          {children}
        </Typography>
      </div>
    )
  }
)

TagRectangular.defaultProps = {
  variant: 'light-grey',
}

TagRectangular.displayName = 'TagRectangular'

export default TagRectangular
