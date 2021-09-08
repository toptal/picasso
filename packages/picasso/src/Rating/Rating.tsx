import React, { forwardRef, ReactNode, ChangeEvent, useCallback } from 'react'
import { BaseProps } from '@toptal/picasso-shared'
import { makeStyles } from '@material-ui/core/styles'
import cx from 'classnames'

import Container from '../Container'
import RatingIcon from '../RatingIcon'
import styles from './styles'

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
}

const useStyles = makeStyles(styles, {
  name: 'PicassoRating'
})

const Rating = forwardRef<HTMLDivElement, Props>(function Rating(props, ref) {
  const {
    name,
    value,
    onChange,
    renderItem = (_, icon) => icon,
    max,
    interactive = true,
    ...rest
  } = props

  const classes = useStyles()

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
          />
        )

        // When the user clicks again on the selected rating, reset the rating
        const shouldReset = itemValue === Number(value)

        return (
          <label
            key={itemId}
            htmlFor={shouldReset ? resetInputId : itemId}
            className={cx(classes.label, {
              [classes.clickableLabel]: interactive
            })}
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
              className={classes.radio}
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
        className={classes.radio}
      />
    </Container>
  )
})

Rating.defaultProps = {
  interactive: true,
  max: 5
}

Rating.displayName = 'PicassoRating'

export default Rating
