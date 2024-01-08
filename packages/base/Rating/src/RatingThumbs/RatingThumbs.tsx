import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import type { BaseProps, SizeType } from '@toptal/picasso-shared'
import classNames from 'classnames'
import type { ChangeEvent } from 'react'
import React, { forwardRef, useCallback, useState } from 'react'
import {
  ThumbsDown16,
  ThumbsDown24,
  ThumbsUp16,
  ThumbsUp24,
} from '@toptal/picasso-icons'
import { Container } from '@toptal/picasso-container'

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
  value?: boolean

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

  // For testing
  testIds?: {
    positiveInput?: string
    negativeInput?: string
  }
}

const useStyles = makeStyles<Theme>(styles)

const enum ThumbsValue {
  POSITIVE = 'positive',
  NEGATIVE = 'negative',
}

const componentsBySize = {
  small: [ThumbsUp16, ThumbsDown16],
  large: [ThumbsUp24, ThumbsDown24],
} as const

let globalId = 0

export const RatingThumbs = forwardRef<HTMLDivElement, Props>(
  function RatingThumbs(
    { name, interactive = true, size = 'small', value, onChange, testIds = {} },
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
          onChange?.(event.target.value === ThumbsValue.POSITIVE, event)
        }
      },
      [onChange, interactive]
    )

    return (
      <Container ref={ref}>
        <label className={classes.label} htmlFor={positiveInputId}>
          <ThumbsUp
            className={classNames(classes.thumbs, {
              [classes.interactiveThumbs]: interactive,
              [classes.thumbsPositive]: value === true,
            })}
          />

          <input
            id={positiveInputId}
            className={classes.radio}
            type='radio'
            name={name}
            value={ThumbsValue.POSITIVE}
            onChange={handleChange}
            readOnly={!interactive}
            checked={value === true}
            data-testid={testIds.positiveInput}
          />
        </label>

        <label className={classes.label} htmlFor={negativeInputId}>
          <ThumbsDown
            className={classNames(classes.thumbs, {
              [classes.interactiveThumbs]: interactive,
              [classes.thumbsNegative]: value === false,
            })}
          />

          <input
            id={negativeInputId}
            className={classes.radio}
            type='radio'
            name={name}
            value={ThumbsValue.NEGATIVE}
            onChange={handleChange}
            readOnly={!interactive}
            checked={value === false}
            data-testid={testIds.negativeInput}
          />
        </label>
      </Container>
    )
  }
)

RatingThumbs.displayName = 'RatingThumbs'

export default RatingThumbs
