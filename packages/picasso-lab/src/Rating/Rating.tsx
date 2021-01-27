import React, { FC, ReactNode, ChangeEvent, useCallback } from 'react'
import { Container, Star16, StarSolid16 } from '@toptal/picasso'
import { BaseProps } from '@toptal/picasso-shared'
import { makeStyles } from '@material-ui/core/styles'
import cx from 'classnames'

import styles from './styles'

export interface Props extends BaseProps {
  /** Name of the rating input */
  name: string
  /** Current rating */
  value: number
  /** Optional Callback invoked when a rating icon is clicked and readOnly is false */
  onChange?: (event: ChangeEvent<HTMLInputElement>, value: number) => void
  /** Optional callback invoked for each icon. Can be used to customize how icons are rendered */
  renderItem?: (value: number, defaultIcon: ReactNode) => ReactNode
  /** Number of rating icons. Defaults to 5 */
  max?: number
  /** Optionally make rating readOnly. Defaults to false */
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
  max,
  readOnly,
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
            {itemValue <= value ? (
              <StarSolid16
                color='yellow'
                className={cx({ [classes.clickableIcon]: !readOnly })}
              />
            ) : (
              <Star16
                color='yellow'
                className={cx({ [classes.clickableIcon]: !readOnly })}
              />
            )}
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

Rating.defaultProps = {
  max: 5,
  readOnly: false
}

Rating.displayName = 'Rating'

export default Rating
