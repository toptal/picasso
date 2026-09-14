import React from 'react'
import { render, screen } from '@toptal/picasso-test-utils'
import type { FormSpyRenderProps } from 'react-final-form'

import { FormCompound as Form } from '../FormCompound'
import type { FullFormSpyRenderProps } from '../FormState'
import type { FormSpyWrapperProps } from './index'
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

    it('keeps the state non-optional at a leaf call', () => {
      renderInForm(
        <FormSpy<Values>>
          {({ submitting, initialValues }) => {
            const isSubmitting: boolean = submitting
            const values: Partial<Values> = initialValues

            return <span>{`${isSubmitting} ${JSON.stringify(values)}`}</span>
          }}
        </FormSpy>
      )

      expect(screen.getByText('false {}')).toBeInTheDocument()
    })

    it('accepts a wrapper forwarding a subscription it cannot resolve', () => {
      // The case the catch-all overload exists for: `spyProps.subscription`
      // is `FormSubscription | undefined`, and overload resolution does not
      // distribute over that union
      const LabelledSpy = <T,>({
        label,
        ...spyProps
      }: FormSpyWrapperProps<T> & { label: string }) => (
        <>
          <span>{label}</span>
          <FormSpy<T> {...spyProps} />
        </>
      )

      renderInForm(
        <LabelledSpy<Values> label='wrapped'>
          {({ submitting }) => {
            // @ts-expect-error a wrapper cannot promise its caller omitted `subscription`
            const wrong: boolean = submitting

            return <span>{`spy ${wrong}`}</span>
          }}
        </LabelledSpy>
      )

      expect(screen.getByText('wrapped')).toBeInTheDocument()
      expect(screen.getByText('spy false')).toBeInTheDocument()
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
