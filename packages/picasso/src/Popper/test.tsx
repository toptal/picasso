import React, { useCallback, useState, RefObject, FC } from 'react'
import { render, cleanup } from '@testing-library/react'
import { RootContext } from '@toptal/picasso-shared'

import Popper from './Popper'

afterEach(cleanup)

const FakeRootComponent: FC = ({ children }) => {
  const [rootRef, setRootRef] = useState<RefObject<HTMLDivElement>>()

  const onRefSet = useCallback(ref => {
    setRootRef({
      current: ref
    })
  }, [])

  return (
    <div ref={onRefSet} role='root'>
      <RootContext.Provider
        value={{ rootRef, hasPageHeader: false, setHasPageHeader: () => {} }}
      >
        {children}
      </RootContext.Provider>
    </div>
  )
}

test('default render', () => {
  const { getByRole } = render(
    <Popper open anchorEl={document.body}>
      {'some children'}
    </Popper>,
    { wrapper: FakeRootComponent }
  )

  const popper = getByRole('tooltip')
  const root = getByRole('root')

  expect(root.firstChild).toBe(popper)
})
