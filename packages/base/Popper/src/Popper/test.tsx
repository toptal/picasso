import React from 'react'
import MUIPopper from '@material-ui/core/Popper'
import { usePicassoRoot } from '@toptal/picasso-provider'
import { render } from '@testing-library/react'

import type { Props } from './Popper'
import Popper, { getPopperOptions } from './Popper'

jest.mock('@material-ui/core/Popper', () => jest.fn(() => null))
jest.mock('@toptal/picasso-provider', () => ({
  useBreakpoint: () => true,
  usePicassoRoot: jest.fn(),
}))
jest.mock('@toptal/picasso-utils', () => ({
  __esModule: true,
  useWidthOf: () => '300px',
}))

const mockedUsePicassoRoot = usePicassoRoot as jest.Mock<
  ReturnType<typeof usePicassoRoot>
>
const mockedMUIPopper = MUIPopper as jest.Mock<ReturnType<typeof MUIPopper>>

const rootDiv = document.createElement('div')

rootDiv.setAttribute('id', 'root')

const anchorEl = document.body
const children = 'some children'
const className =
  'z-modal xs:max-md:w-screen xs:max-md:max-w-screen xs:max-md:p-0 xs:max-md:m-0 [&[x-out-of-boundaries]]:hidden'
const disablePortal = false
const open = true
const placement = 'top'
const defaultPopperProps = {
  container: rootDiv,
  anchorEl,
  children,
  className,
  disablePortal,
  open,
  placement,
  popperRef: null,
  style: {
    width: '300px',
  },
  popperOptions: getPopperOptions({}),
}

const renderComponent = (props: Partial<Props> = {}) => {
  return render(
    <div id='root'>
      <Popper
        open={open}
        anchorEl={anchorEl}
        disablePortal={disablePortal}
        placement={placement}
        {...props}
      >
        {children}
      </Popper>
    </div>,
    {
      container: document.body.appendChild(rootDiv),
    }
  )
}

describe('Popper', () => {
  beforeEach(() => {
    mockedMUIPopper.mockClear()
    mockedUsePicassoRoot.mockReturnValue(rootDiv)
  })

  describe('when container prop is passed', () => {
    it('calls MUIPopper with passed container', () => {
      const container = document.createElement('div')

      renderComponent({
        container,
      })

      expect(mockedMUIPopper).toHaveBeenCalledTimes(1)
      expect(mockedMUIPopper).toHaveBeenCalledWith(
        {
          ...defaultPopperProps,
          container,
        },
        {}
      )
    })
  })

  describe('when container prop is NOT passed', () => {
    it('calls MUIPopper with default root container', () => {
      renderComponent({
        container: undefined,
      })

      expect(mockedMUIPopper).toHaveBeenCalledTimes(1)
      expect(mockedMUIPopper).toHaveBeenCalledWith(
        {
          ...defaultPopperProps,
          container: rootDiv,
        },
        {}
      )
    })
  })

  describe('when custom width prop is passed', () => {
    it('calls MUIPopper with custom width style', () => {
      renderComponent({
        width: '400px',
      })

      expect(mockedMUIPopper).toHaveBeenCalledTimes(1)
      expect(mockedMUIPopper).toHaveBeenCalledWith(
        {
          ...defaultPopperProps,
          style: {
            width: '400px',
          },
        },
        {}
      )
    })
  })

  describe('when custom width prop is NOT passed', () => {
    describe('when autoWidth prop is false', () => {
      it('calls MUIPopper without assigning width style', () => {
        renderComponent({
          width: undefined,
          autoWidth: false,
        })

        expect(mockedMUIPopper).toHaveBeenCalledTimes(1)
        expect(mockedMUIPopper).toHaveBeenCalledWith(
          {
            ...defaultPopperProps,
            style: {},
          },
          {}
        )
      })
    })
  })
})
