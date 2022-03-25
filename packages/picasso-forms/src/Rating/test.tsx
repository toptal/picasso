import React from 'react'
import { render, fireEvent } from '@toptal/picasso/test-utils'

import { RatingThumbsProps } from './Rating'
import Form, { Props as FormProps } from '../Form'

let defaultOnSubmit: jest.Mock = jest.fn()

enum TestId {
  SUBMIT_BUTTON = 'submit-button',
  POSITIVE_THUMB = 'positive-thumb',
  NEGATIVE_THUMB = 'negative-thumb'
}

const renderThumbsForm = (
  props: {
    form?: Partial<FormProps>
    thumbs?: Partial<RatingThumbsProps>
  } = {}
) =>
  render(
    <Form onSubmit={defaultOnSubmit} {...props.form}>
      <Form.Rating.Thumbs
        name='thumbs'
        testIds={{
          positiveInput: TestId.POSITIVE_THUMB,
          negativeInput: TestId.NEGATIVE_THUMB
        }}
        {...props.thumbs}
      />

      <button type='submit' data-testid={TestId.SUBMIT_BUTTON}>
        Submit
      </button>
    </Form>
  )

describe('Rating', () => {
  beforeEach(() => {
    defaultOnSubmit = jest.fn()
  })

  describe('Thumbs', () => {
    it('renders default Thumbs', () => {
      const { container } = render(
        <Form onSubmit={defaultOnSubmit}>
          <Form.Rating.Thumbs
            name='thumbs'
            testIds={{
              positiveInput: TestId.POSITIVE_THUMB,
              negativeInput: TestId.NEGATIVE_THUMB
            }}
          />
        </Form>
      )

      expect(container).toMatchSnapshot()
    })

    it('renders default Stars', () => {
      const { container } = render(
        <Form onSubmit={defaultOnSubmit}>
          <Form.Rating.Stars name='stars' />
        </Form>
      )

      expect(container).toMatchSnapshot()
    })

    describe('when submitting while required', () => {
      it("don't show a validation error for negative values", () => {
        const { getByTestId, queryByText } = renderThumbsForm({
          thumbs: { required: true }
        })

        fireEvent.click(getByTestId(TestId.NEGATIVE_THUMB))
        fireEvent.click(getByTestId(TestId.SUBMIT_BUTTON))

        expect(
          queryByText('Please complete this field.')
        ).not.toBeInTheDocument()

        expect(defaultOnSubmit).toHaveBeenCalledWith(
          { thumbs: false },
          expect.anything(),
          expect.anything()
        )
        expect(defaultOnSubmit).toHaveBeenCalledTimes(1)
      })
    })

    describe('when submitting with custom validation', () => {
      it('validate both required when having a custom validation with preference', () => {
        const ERROR_MSG = 'Errata'
        const { getByTestId, queryByText } = renderThumbsForm({
          thumbs: { required: true, validate: () => ERROR_MSG }
        })

        fireEvent.click(getByTestId(TestId.SUBMIT_BUTTON))

        expect(queryByText('Please complete this field.')).toBeInTheDocument()

        expect(defaultOnSubmit).toHaveBeenCalledTimes(0)
      })

      it('validate both required and having a custom validation', () => {
        const ERROR_MSG = 'Errata'
        const { getByTestId, queryByText } = renderThumbsForm({
          thumbs: { required: true, validate: () => ERROR_MSG }
        })

        fireEvent.click(getByTestId(TestId.NEGATIVE_THUMB))
        fireEvent.click(getByTestId(TestId.SUBMIT_BUTTON))

        expect(queryByText(ERROR_MSG)).toBeInTheDocument()

        expect(defaultOnSubmit).toHaveBeenCalledTimes(0)
      })

      it('validate both required and having a custom validation, everythin ok', () => {
        const { getByTestId, queryByText } = renderThumbsForm({
          thumbs: { required: true, validate: () => undefined }
        })

        fireEvent.click(getByTestId(TestId.NEGATIVE_THUMB))
        fireEvent.click(getByTestId(TestId.SUBMIT_BUTTON))

        expect(
          queryByText('Please complete this field.')
        ).not.toBeInTheDocument()

        expect(defaultOnSubmit).toHaveBeenCalledWith(
          { thumbs: false },
          expect.anything(),
          expect.anything()
        )
        expect(defaultOnSubmit).toHaveBeenCalledTimes(1)
      })
    })

    describe('when submitting with requiredPositive true', () => {
      it("don't allow a negative value", () => {
        const { getByTestId, queryByText } = renderThumbsForm({
          thumbs: { requirePositive: true }
        })

        fireEvent.click(getByTestId(TestId.NEGATIVE_THUMB))
        fireEvent.click(getByTestId(TestId.SUBMIT_BUTTON))

        expect(queryByText('Please complete this field.')).toBeInTheDocument()

        expect(defaultOnSubmit).toHaveBeenCalledTimes(0)
      })
    })
  })
})
