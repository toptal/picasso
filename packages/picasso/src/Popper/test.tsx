import React, { useState, FC, ReactNode, forwardRef } from 'react'
import Picasso from '@toptal/picasso-provider'
import { render, act, fireEvent } from '@toptal/picasso/test-utils'

import Popper from './Popper'

// eslint-disable-next-line react/display-name
const FakeRootNode = forwardRef<HTMLDivElement, { children?: ReactNode }>(
  (props, ref) => {
    const { children } = props

    return (
      <div ref={ref} role='root'>
        {children}
      </div>
    )
  }
)

const PicassoWithFakeRootNode: FC = ({ children }) => {
  return (
    <Picasso
      loadFonts={false}
      loadFavicon={false}
      fixViewport={false}
      RootComponent={FakeRootNode}
    >
      {children}
    </Picasso>
  )
}

const PopperRenderer = () => {
  const [popoverIsOpen, setPopoverIsOpen] = useState(false)

  return (
    <>
      <button onClick={() => setPopoverIsOpen(true)} role='action'>
        Click
      </button>
      <Popper open={popoverIsOpen} anchorEl={document.body}>
        some children
      </Popper>
    </>
  )
}

describe('Popper', () => {
  it('renders', () => {
    const { getByRole } = render(<PopperRenderer />, {
      wrapper: PicassoWithFakeRootNode
    })

    act(() => {
      fireEvent.click(getByRole('action'))
    })

    const popper = getByRole('tooltip')
    const root = getByRole('root')

    expect(root).toContainElement(popper)
  })
})
