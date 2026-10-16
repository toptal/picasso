import { act, render, screen, waitFor } from '@toptal/picasso-test-utils'
import React, { startTransition, useState } from 'react'
import type { FormApi } from 'final-form'
import { Field as FinalFormField, useForm } from 'react-final-form'

import Checkbox from '../Checkbox'
import { Form } from '../Form'
import type { Props } from './CheckboxGroup'
import { CheckboxGroup } from './CheckboxGroup'

const arrangeTest = ({ titleCase }: Partial<Props> = {}) =>
  render(
    <Form onSubmit={() => {}}>
      <CheckboxGroup
        required
        name='checkbox-group'
        label='Checkbox group label'
        titleCase={titleCase}
      >
        <Checkbox label='checkbox-label-0' value='checkbox-value-0' />
        <Checkbox label='checkbox-label-1' value='checkbox-value-1' />
      </CheckboxGroup>
    </Form>
  )

const FirstValue = ({ value }: { value: unknown }) => {
  const [first] = useState(value)

  return <output>{String(first)}</output>
}

// Outlasts React's 5 ms render slice, so a concurrent render yields after it
const SlowRender = () => {
  const start = performance.now()

  while (performance.now() - start < 20) {
    // Keep the render busy
  }

  return null
}

const createRemountable = () => {
  const setMountedRef: { current?: (mounted: boolean) => void } = {}
  const Remountable = ({ children }: { children: React.ReactNode }) => {
    const [mounted, setMounted] = useState(true)

    setMountedRef.current = setMounted

    return <>{mounted && children}</>
  }

  return {
    Remountable,
    unmount: () => act(() => setMountedRef.current?.(false)),
    // Outside `act`, React renders the transition concurrently and yields
    remountInTransition: async () => {
      const environment = globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }
      const actEnvironment = environment.IS_REACT_ACT_ENVIRONMENT

      environment.IS_REACT_ACT_ENVIRONMENT = false

      try {
        startTransition(() => setMountedRef.current?.(true))
        await waitFor(() =>
          expect(screen.getByRole('status')).toBeInTheDocument()
        )
      } finally {
        environment.IS_REACT_ACT_ENVIRONMENT = actEnvironment
      }
    },
  }
}

describe('CheckboxGroup', () => {
  it('shows the label in default case', () => {
    const { getByText } = arrangeTest()

    expect(getByText('Checkbox group label')).toBeInTheDocument()
  })

  it('shows the label in title case', () => {
    const { getByText } = arrangeTest({ titleCase: true })

    expect(getByText('Checkbox Group Label')).toBeInTheDocument()
  })

  it("renders a checkbox's stored state on its first render when a transition render yields before it", async () => {
    const formRef: { current?: FormApi } = {}
    const CaptureForm = () => {
      formRef.current = useForm()

      return null
    }
    const { Remountable, unmount, remountInTransition } = createRemountable()

    render(
      <Form onSubmit={() => {}} initialValues={{ choices: [] }}>
        <CaptureForm />
        <Remountable>
          <CheckboxGroup name='choices'>
            <SlowRender />
            <FinalFormField name='choices' type='checkbox' value='b'>
              {({ input }) => <FirstValue value={input.checked} />}
            </FinalFormField>
          </CheckboxGroup>
        </Remountable>
      </Form>
    )

    act(() => {
      formRef.current?.change('choices', ['b'])
    })
    unmount()
    await remountInTransition()

    expect(screen.getByRole('status')).toHaveTextContent('true')
  })
})
