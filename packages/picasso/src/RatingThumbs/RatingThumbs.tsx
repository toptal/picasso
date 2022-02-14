import { makeStyles, Theme } from '@material-ui/core/styles'
import { BaseProps, SizeType } from '@toptal/picasso-shared'
import classNames from 'classnames'
import React, { ChangeEvent, forwardRef, useCallback, useState } from 'react'

import { ThumbsDown16, ThumbsDown24, ThumbsUp24 } from '../Icon'
import ThumbsUp16 from '../Icon/ThumbsUp16'
import styles from './styles'

type Size = SizeType<'small' | 'large'>

export interface Props extends BaseProps {
  /**
   * Name of the form input group
   */
  name: string

  /**
   * Current value for the rating, true means thumbs up, false thumbs down and undefined means not selected
   */
  value?: boolean | undefined

  /**
   * Callback invoked when the rating is changed
   */
  onChange?: (value: boolean, event: ChangeEvent<HTMLDivElement>) => void

  /**
   * If the component should respond to user interactions. If false the value cannot be changed by the user. Defaults to true
   */
  interactive?: boolean

  /**
   * Size of the input control. Defaults to small
   */
  size?: Size
}

const useStyles = makeStyles<Theme>(styles)

const POSITIVE_VALUE = 'positive'
const NEGATIVE_VALUE = 'negative'

const componentsBySize = {
  small: [ThumbsUp16, ThumbsDown16],
  large: [ThumbsUp24, ThumbsDown24]
} as const

let globalId = 0

export const RatingThumbs = forwardRef<HTMLDivElement, Props>(
  function RatingThumbs(
    { name, interactive = true, size = 'small', value, onChange },
    ref
  ) {
    const classes = useStyles()

    const [baseUniqueId] = useState(() => globalId++)

    const positiveInputId = `${baseUniqueId}-posititve`
    const negativeInputId = `${baseUniqueId}-negative`

    const [ThumbsUp, ThumbsDown] = componentsBySize[size]

    const handleChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        if (interactive) {
          onChange?.(event.target.value === POSITIVE_VALUE, event)
        }
      },
      [onChange, interactive]
    )

    return (
      <div ref={ref}>
        <label className={classes.label} htmlFor={positiveInputId}>
          <ThumbsUp
            className={classNames(
              classes.thumbs,
              interactive && classes.interactiveThumbs,
              value === true && classes.thumbsPositive
            )}
          />

          <input
            id={positiveInputId}
            className={classes.radio}
            type='radio'
            name={name}
            value={POSITIVE_VALUE}
            onChange={handleChange}
            readOnly={!interactive}
            checked={value === true}
            data-testid='positive-input'
          />
        </label>

        <label className={classes.label} htmlFor={negativeInputId}>
          <ThumbsDown
            className={classNames(
              classes.thumbs,
              interactive && classes.interactiveThumbs,
              value === false && classes.thumbsNegative
            )}
          />

          <input
            id={negativeInputId}
            className={classes.radio}
            type='radio'
            name={name}
            value={NEGATIVE_VALUE}
            onChange={handleChange}
            readOnly={!interactive}
            checked={value === false}
            data-testid='negative-input'
          />
        </label>
      </div>
    )
  }
)

RatingThumbs.displayName = 'RatingThumbs'

export default RatingThumbs
