import React from 'react'
import type {
  RatingStarsProps as PicassoRatingStarsProps,
  RatingThumbsProps as PicassoRatingThumbsProps,
} from '@toptal/picasso'
import { Rating as PicassoRating } from '@toptal/picasso'

import type { FieldProps } from '../Field'
import PicassoField from '../Field'
import FieldLabel from '../FieldLabel'
import type { Props as FieldLabelProps } from '../FieldLabel'
import { validators } from '../utils'

export type RatingStarsProps = PicassoRatingStarsProps &
  FieldProps<PicassoRatingStarsProps['value']> &
  FieldLabelProps

const Stars = (props: RatingStarsProps) => {
  const { label, labelEndAdornment, titleCase, ...rest } = props

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
            labelEndAdornment={labelEndAdornment}
            titleCase={titleCase}
          />
        ) : null
      }
    >
      {({
        // omit 'highlight' as it is used only for classic inputs
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        highlight,
        ...inputProps
      }) => <PicassoRating.Stars {...inputProps} />}
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
  const {
    required,
    validate,
    requirePositive,
    label,
    labelEndAdornment,
    titleCase,
    ...rest
  } = props

  const validateOverride = validators.composeValidators([
    required && !requirePositive ? thumbsRequired : undefined,
    validate,
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
            labelEndAdornment={labelEndAdornment}
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
  Thumbs,
} as const

export default Rating
