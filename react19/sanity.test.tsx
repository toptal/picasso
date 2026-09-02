import React, { StrictMode, useEffect, useId, useState } from 'react'
import { version as reactDomVersion } from 'react-dom'
import { render } from '@testing-library/react'

// Sanity checks for the React 19 harness (jest.react19.mjs): prove the alias
// mappings actually resolve React 19 and that rendering works under
// StrictMode. This directory is only in the react19 config's roots, so
// `pnpm test:unit` never runs it.
describe('react 19 test runtime', () => {
  it('resolves react and react-dom 19 through the aliases', () => {
    expect(React.version).toMatch(/^19\./)
    expect(reactDomVersion).toMatch(/^19\./)
    expect(reactDomVersion).toBe(React.version)
  })

  it('rewrites useId output to the React 18 format the snapshots use', () => {
    let id = ''

    const Probe = () => {
      id = useId()

      return null
    }

    render(<Probe />)

    expect(id).toMatch(/^:r[0-9a-z]*:$/)
  })

  it('renders and re-renders under StrictMode', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation()

    const Probe = () => {
      const [ready, setReady] = useState(false)

      useEffect(() => {
        setReady(true)
      }, [])

      return <div data-testid='probe'>{ready ? 'ready' : 'mounting'}</div>
    }

    const { getByTestId } = render(
      <StrictMode>
        <Probe />
      </StrictMode>
    )

    expect(getByTestId('probe').textContent).toBe('ready')
    expect(consoleError).not.toHaveBeenCalled()

    consoleError.mockRestore()
  })
})
