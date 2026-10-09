import React, { useState } from 'react'
import { renderToString } from 'react-dom/server'
import { createForm } from 'final-form'
import { Form as FinalForm } from 'react-final-form'

import { useField } from './index'

// A server render, which has no `window`
jest.mock('@toptal/picasso-shared', () => ({
  ...jest.requireActual<object>('@toptal/picasso-shared'),
  isBrowser: () => false,
}))

const FirstValue = ({ value }: { value: unknown }) => {
  const [first] = useState(value)

  return <output>{String(first)}</output>
}

const HookInput = () => {
  const { input } = useField<string, HTMLInputElement>('a')

  return (
    <>
      <input {...input} />
      <FirstValue value={input.value} />
    </>
  )
}

describe('useField on the server', () => {
  it('leaves nothing registered after a server render', async () => {
    // jsdom's `window` makes the claim pick a layout effect, which React
    // warns about on the server
    const consoleError = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {})
    const form = createForm<{ a: string }>({
      onSubmit: jest.fn(),
      initialValues: { a: 'x' },
    })

    form.change('a', 'y')

    const html = renderToString(
      <FinalForm
        form={form}
        onSubmit={jest.fn()}
        render={() => <HookInput />}
      />
    )

    await Promise.resolve()
    consoleError.mockRestore()

    expect(html).toContain('<output>y</output>')
    expect(form.getRegisteredFields()).not.toContain('a')
  })
})
