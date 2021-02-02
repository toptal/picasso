import React, { FC, ReactNode, ChangeEvent, useCallback } from 'react'
import { Container } from '@toptal/picasso'
import { BaseProps } from '@toptal/picasso-shared'
import { makeStyles } from '@material-ui/core/styles'
import cx from 'classnames'

import styles from './styles'
import RatingIcon from '../RatingIcon'

export interface Props extends BaseProps {
  /** Value of the name attribute of the rating input */
  name: string
  /** Current rating */
  value: number
  /** Callback invoked when a rating icon is clicked */
  onChange?: (event: ChangeEvent<HTMLInputElement>, value: number) => void
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

const Rating: FC<Props> = ({
  name,
  value,
  onChange,
  renderItem = (_, icon) => icon,
  max,
  interactive = true,
  ...rest
}) => {
  const classes = useStyles()

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (onChange && interactive) {
        onChange(event, Number(event.target.value))
      }
    },
    [onChange, interactive]
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
          <RatingIcon active={itemValue <= value} interactive={interactive} />
        )

        return (
          <label
            key={itemId}
            htmlFor={itemId}
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
    </Container>
  )
}

Rating.defaultProps = {
  interactive: true,
  max: 5
}

Rating.displayName = 'PicassoRating'

export default Rating
