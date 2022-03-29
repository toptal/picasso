import React from 'react'
import {
  Rating as PicassoRating,
  RatingStarsProps as PicassoRatingStarsProps,
  RatingThumbsProps as PicassoRatingThumbsProps
} from '@toptal/picasso'

import PicassoField, { FieldProps } from '../Field'
import FieldLabel from '../FieldLabel'
import { validators } from '../utils'

export type RatingStarsProps = PicassoRatingStarsProps &
  FieldProps<PicassoRatingStarsProps['value']>

const Stars = (props: RatingStarsProps) => {
  const { label, titleCase, ...rest } = props

  return (
    <PicassoField<PicassoRatingStarsProps>
      {...rest}
      type='number'
      label={
        label ? (
          <FieldLabel
            name={props.name}
            required={props.required}
            label={label}
            titleCase={titleCase}
          />
        ) : null
      }
    >
      {inputProps => <PicassoRating.Stars {...inputProps} />}
    </PicassoField>
  )
}

export type RatingThumbsProps = PicassoRatingThumbsProps &
  FieldProps<PicassoRatingThumbsProps['value']> & { requirePositive?: boolean }

/*
 * The default required validator gives an error when the value is false, this
 * makes sense for checkboxes and similar controls, with the Thumbs component
 * however, it is expected to return false as the thumbs down option. We are
 * overriding the default required validation to only give an error on
 * null/undefined values.
 *
 * We still have an requiredPositive prop in case you need to have the default
 * behavior and requires a thumbs up for whatever reason.
 */
const thumbsRequired = (value: boolean | undefined) =>
  value == null ? validators.required(null) : undefined

const Thumbs = (props: RatingThumbsProps) => {
  const { required, validate, requirePositive, label, titleCase, ...rest } =
    props

  const validateOverride = validators.composeValidators([
    required && !requirePositive ? thumbsRequired : undefined,
    validate
  ])

  return (
    <PicassoField<PicassoRatingThumbsProps>
      validate={validateOverride}
      required={requirePositive}
      {...rest}
      label={
        label ? (
          <FieldLabel
            name={props.name}
            required={props.required}
            label={label}
            titleCase={titleCase}
          />
        ) : null
      }
    >
      {inputProps => <PicassoRating.Thumbs {...inputProps} />}
    </PicassoField>
  )
}

export const Rating = {
  Stars,
  Thumbs
} as const

export default Rating
