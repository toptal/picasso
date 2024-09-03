import type { ReactNode, ChangeEvent } from 'react'
import React, { forwardRef, useCallback } from 'react'
import type { BaseProps, SizeType } from '@toptal/picasso-shared'
import { Container } from '@toptal/picasso-container'
import { twJoin } from '@toptal/picasso-tailwind-merge'

import { RatingIcon } from '../RatingIcon'

export interface Props extends BaseProps {
  /** Value of the name attribute of the rating input */
  name: string
  /** Current rating */
  value?: number
  /** Callback invoked when a rating icon is clicked */
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  /** Function to customize icon rendering */
  renderItem?: (value: number, defaultIcon: ReactNode) => ReactNode
  /** Number of rating icons */
  max?: number
  /** Flag to allow or disable interactions with the component */
  interactive?: boolean
  /** Size variant */
  size?: SizeType<'small' | 'large'>
}

const RatingStars = forwardRef<HTMLDivElement, Props>(function RatingStars(
  props,
  ref
) {
  const {
    name,
    value,
    onChange,
    renderItem = (_, icon) => icon,
    max,
    interactive = true,
    size = 'small',
    ...rest
  } = props

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (onChange && interactive) {
        onChange(event)
      }
    },
    [onChange, interactive]
  )

  const resetInputId = `${name}-reset`

  return (
    <Container
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      ref={ref}
    >
      {[...Array(max)].map((_, index) => {
        const itemValue = index + 1
        const itemId = `${name}-${itemValue}`

        const defaultIcon = (
          <RatingIcon
            active={!!value && itemValue <= value}
            interactive={interactive}
            size={size}
          />
        )

        // When the user clicks again on the selected rating, reset the rating
        const shouldReset = itemValue === Number(value)

        return (
          <label
            key={itemId}
            htmlFor={shouldReset ? resetInputId : itemId}
            className={twJoin('mr-[.125rem]', interactive && 'cursor-pointer')}
          >
            {renderItem(itemValue, defaultIcon)}
            <input
              type='radio'
              name={name}
              id={itemId}
              value={itemValue}
              onChange={handleChange}
              readOnly={!interactive}
              checked={itemValue === value}
              className='hidden'
              data-testid={itemId}
            />
          </label>
        )
      })}

      {/* Reset input. Triggered when the user clicks on an already selected rating icon */}
      <input
        type='radio'
        name={name}
        id={resetInputId}
        value=''
        onChange={handleChange}
        className='hidden'
      />
    </Container>
  )
})

RatingStars.defaultProps = {
  interactive: true,
  max: 5,
  size: 'small',
}

RatingStars.displayName = 'RatingStars'

export default RatingStars
