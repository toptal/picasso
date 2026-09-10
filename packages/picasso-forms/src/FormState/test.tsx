import React from 'react'
import { render, screen } from '@toptal/picasso-test-utils'
import type { FormState } from 'final-form'

import { FormCompound as Form } from '../FormCompound'
import type { FullFormState } from './index'
import { useFormState } from './index'

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

describe('useFormState', () => {
  describe('without a subscription', () => {
    it('reports an absent `initialValues` as an empty object', () => {
      const Probe = () => {
        const { initialValues } = useFormState<Values>()

        return <span>{JSON.stringify(initialValues)}</span>
      }

      renderInForm(<Probe />)

      expect(screen.getByText('{}')).toBeInTheDocument()
    })

    it("passes the form's `initialValues` through", () => {
      const Probe = () => {
        const { initialValues } = useFormState<Values>()

        return <span>{initialValues.firstName}</span>
      }

      renderInForm(<Probe />, { firstName: 'Bruce' })

      expect(screen.getByText('Bruce')).toBeInTheDocument()
    })

    it('fills the state booleans final-form subscribes to', () => {
      const Probe = () => {
        const { submitting, pristine, dirty, valid, touched } =
          useFormState<Values>()

        return (
          <span>
            {JSON.stringify({ submitting, pristine, dirty, valid, touched })}
          </span>
        )
      }

      renderInForm(<Probe />)

      expect(
        screen.getByText(
          '{"submitting":false,"pristine":true,"dirty":false,"valid":true,"touched":{}}'
        )
      ).toBeInTheDocument()
    })

    it('keeps the same empty `initialValues` across renders', () => {
      const seen: unknown[] = []
      const Probe = ({ label }: { label: string }) => {
        seen.push(useFormState<Values>().initialValues)

        return <span>{label}</span>
      }

      const { rerender } = render(
        <Form onSubmit={jest.fn()}>
          <Probe label='first' />
        </Form>
      )

      rerender(
        <Form onSubmit={jest.fn()}>
          <Probe label='second' />
        </Form>
      )

      expect(seen.length).toBeGreaterThan(1)
      expect(new Set(seen).size).toBe(1)
    })

    it("keeps react-final-form's lazy state getters", () => {
      // The defaults are applied by copying property descriptors: a spread
      // would turn the getters upstream defines on purpose into snapshots
      let descriptor: PropertyDescriptor | undefined

      const Probe = () => {
        descriptor = Object.getOwnPropertyDescriptor(
          useFormState<Values>(),
          'values'
        )

        return null
      }

      renderInForm(<Probe />)

      expect(descriptor?.get).toBeDefined()
    })
  })

  describe('with a subscription', () => {
    it('leaves the keys it does not subscribe to undefined', () => {
      const Probe = () => {
        const { submitting, initialValues, pristine } = useFormState<Values>({
          subscription: { submitting: true },
        })

        return (
          <span>{JSON.stringify({ submitting, initialValues, pristine })}</span>
        )
      }

      renderInForm(<Probe />, { firstName: 'Bruce' })

      expect(screen.getByText('{"submitting":false}')).toBeInTheDocument()
    })
  })

  describe('types', () => {
    // Not enforced by CI: the repo's `tsconfig.jest.json` inherits the base
    // `exclude`, so no test file is type-checked. Run
    // `tsc --noEmit` over this file to check them.
    it('makes the subscribed keys non-optional without a subscription', () => {
      const Probe = () => {
        const state = useFormState<Values>()
        const initialValues: Partial<Values> = state.initialValues
        const submitting: boolean = state.submitting
        const touched: Record<string, boolean> = state.touched

        // @ts-expect-error `active` stays optional: no focused field is an answer
        const active: keyof Values = state.active

        return (
          <span>
            {JSON.stringify({ initialValues, submitting, touched, active })}
          </span>
        )
      }

      renderInForm(<Probe />)

      expect(
        screen.getByText('{"initialValues":{},"submitting":false,"touched":{}}')
      ).toBeInTheDocument()
    })

    it('keeps the optional keys under an explicit subscription', () => {
      const Probe = () => {
        const state = useFormState<Values>({ subscription: { values: true } })

        // @ts-expect-error a narrow subscription keeps `initialValues` optional
        const initialValues: Partial<Values> = state.initialValues
        // @ts-expect-error a narrow subscription keeps `submitting` optional
        const submitting: boolean = state.submitting

        return <span>{`${initialValues} ${submitting}`}</span>
      }

      renderInForm(<Probe />)

      expect(screen.getByText('undefined undefined')).toBeInTheDocument()
    })

    it('falls back to the optional keys when the subscription is only known at runtime', () => {
      const Probe = ({ params }: { params: { subscription?: undefined } }) => {
        const state: FormState<Values> = useFormState<Values>(params)

        return <span>{String(state.submitting)}</span>
      }

      renderInForm(<Probe params={{}} />)

      expect(screen.getByText('false')).toBeInTheDocument()
    })

    it("assigns the full state to final-form's own type", () => {
      const full = {} as FullFormState<Values>
      const upstream: FormState<Values> = full

      expect(upstream).toBeDefined()
    })
  })
})
