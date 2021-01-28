import React, { FC, ReactNode, ChangeEvent, useCallback } from 'react'
import { Container } from '@toptal/picasso'
import { BaseProps } from '@toptal/picasso-shared'
import { makeStyles } from '@material-ui/core/styles'
import cx from 'classnames'

import styles from './styles'
import RatingIcon from './RatingIcon'

export interface Props extends BaseProps {
  /** Name of the rating input */
  name: string
  /** Current rating */
  value: number
  /** Callback invoked when a rating icon is clicked */
  onChange?: (event: ChangeEvent<HTMLInputElement>, value: number) => void
  /** Function to customize icon rendering */
  renderItem?: (value: number, defaultIcon: ReactNode) => ReactNode
  /** Number of rating icons */
  max?: number
  /** Flag to ignore interactions with the component */
  readOnly?: boolean
}

const useStyles = makeStyles(styles, {
  name: 'PicassoRating'
})

const Rating: FC<Props> = ({
  name,
  value,
  onChange,
  renderItem,
  max = 5,
  readOnly = false,
  ...rest
}) => {
  const classes = useStyles()

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (onChange && !readOnly) {
        onChange(event, Number(event.target.value))
      }
    },
    [onChange, readOnly]
  )

  return (
    <Container
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    >
      {[...Array(max)].map((_, index) => {
        const itemValue = index + 1
        const itemId = `${name}-${itemValue}`

        const defaultIcon = (
          <Container as='span'>
            <RatingIcon active={itemValue <= value} readOnly={readOnly} />
          </Container>
        )

        return (
          <label
            key={itemId}
            htmlFor={itemId}
            className={cx(classes.label, {
              [classes.clickableLabel]: !readOnly
            })}
          >
            {typeof renderItem === 'function'
              ? renderItem(itemValue, defaultIcon)
              : defaultIcon}
            <input
              type='radio'
              name={name}
              id={itemId}
              value={itemValue}
              onChange={handleChange}
              readOnly={readOnly}
              checked={itemValue === value}
              className={classes.radio}
              data-testid={itemId}
            />
          </label>
        )
      })}
    </Container>
  )
}

Rating.displayName = 'Rating'

export default Rating
