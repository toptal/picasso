import React from 'react'
import { render, screen } from '@toptal/picasso-test-utils'
import type { FormSpyRenderProps } from 'react-final-form'

import { FormCompound as Form } from '../FormCompound'
import type { FullFormSpyRenderProps } from '../FormState'
import { FormSpy } from './index'

interface Values {
  firstName: string
}

const renderInForm = (
  children: React.ReactNode,
  initialValues?: Partial<Values>
) =>
  render(
    <Form onSubmit={jest.fn()} initialValues={initialValues}>
      {children}
    </Form>
  )

describe('FormSpy', () => {
  it('reports an absent `initialValues` as an empty object', () => {
    renderInForm(
      <FormSpy<Values>>
        {({ initialValues }) => <span>{JSON.stringify(initialValues)}</span>}
      </FormSpy>
    )

    expect(screen.getByText('{}')).toBeInTheDocument()
  })

  it('passes the form state and the form API to a function child', () => {
    renderInForm(
      <FormSpy<Values>>
        {({ initialValues, pristine, form }) => (
          <span>{`${
            initialValues.firstName
          } ${pristine} ${typeof form.change}`}</span>
        )}
      </FormSpy>,
      { firstName: 'Bruce' }
    )

    expect(screen.getByText('Bruce true function')).toBeInTheDocument()
  })

  it('renders through the `render` prop', () => {
    renderInForm(
      <FormSpy<Values>
        render={({ initialValues }) => (
          <span>{JSON.stringify(initialValues)}</span>
        )}
      />
    )

    expect(screen.getByText('{}')).toBeInTheDocument()
  })

  it('renders through the `component` prop', () => {
    const Spied = ({ initialValues }: FullFormSpyRenderProps<Values>) => (
      <span>{JSON.stringify(initialValues)}</span>
    )

    renderInForm(<FormSpy<Values> component={Spied} />)

    expect(screen.getByText('{}')).toBeInTheDocument()
  })

  it('renders nothing and reports state through `onChange`', () => {
    const handleChange = jest.fn()

    const { container } = renderInForm(
      <FormSpy<Values> onChange={handleChange} />
    )

    expect(handleChange).toHaveBeenCalled()
    expect(container.querySelector('span')).toBeNull()
  })

  describe('with a subscription', () => {
    it('leaves the keys it does not subscribe to undefined', () => {
      renderInForm(
        <FormSpy<Values> subscription={{ submitting: true }}>
          {({ submitting, initialValues }) => (
            <span>{`${submitting} ${initialValues}`}</span>
          )}
        </FormSpy>,
        { firstName: 'Bruce' }
      )

      expect(screen.getByText('false undefined')).toBeInTheDocument()
    })
  })

  describe('types', () => {
    // Not enforced by CI: no test file in this repo is type-checked
    it('makes the subscribed keys non-optional without a subscription', () => {
      renderInForm(
        <FormSpy<Values>>
          {props => {
            const initialValues: Partial<Values> = props.initialValues
            const pristine: boolean = props.pristine

            // @ts-expect-error `active` stays optional: no focused field is an answer
            const active: keyof Values = props.active

            return (
              <span>
                {`${JSON.stringify(initialValues)} ${pristine} ${active}`}
              </span>
            )
          }}
        </FormSpy>
      )

      expect(screen.getByText('{} true undefined')).toBeInTheDocument()
    })

    it('keeps the optional keys under an explicit subscription', () => {
      renderInForm(
        <FormSpy<Values> subscription={{ values: true }}>
          {(props: FormSpyRenderProps<Values>) => {
            // @ts-expect-error a narrow subscription keeps `pristine` optional
            const pristine: boolean = props.pristine

            return <span>{`narrow ${pristine}`}</span>
          }}
        </FormSpy>
      )

      expect(screen.getByText('narrow undefined')).toBeInTheDocument()
    })
  })
})
