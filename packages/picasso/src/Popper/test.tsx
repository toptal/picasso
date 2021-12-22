import React from 'react'
import MUIPopper from '@material-ui/core/Popper'
import { usePicassoRoot } from '@toptal/picasso-provider'
import { makeStyles } from '@material-ui/core/styles'
import { render } from '@testing-library/react'

import Popper, { Props, getPopperOptions } from './Popper'
import styles from './styles'

jest.mock('@material-ui/core/Popper', () => jest.fn(() => null))
jest.mock('@toptal/picasso-provider', () => ({
  useBreakpoint: () => true,
  usePicassoRoot: jest.fn()
}))
jest.mock('@material-ui/core/styles', () => ({
  makeStyles: jest.fn(() => () => ({ root: 'TEST_CLASS_NAME+1' }))
}))
jest.mock('../utils/use-width-of', () => ({
  __esModule: true,
  default: () => '300px'
}))

const mockedUsePicassoRoot = usePicassoRoot as jest.Mock<
  ReturnType<typeof usePicassoRoot>
>
const mockedMakeStyles = makeStyles as jest.Mock<ReturnType<typeof makeStyles>>
const mockedMUIPopper = MUIPopper as jest.Mock<ReturnType<typeof MUIPopper>>

const rootDiv = document.createElement('div')

rootDiv.setAttribute('id', 'root')

const anchorEl = document.body
const children = 'some children'
const className = 'TEST_CLASS_NAME+1'
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
    width: '300px'
  },
  popperOptions: getPopperOptions({})
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
      container: document.body.appendChild(rootDiv)
    }
  )
}

describe('Popper', () => {
  beforeEach(() => {
    mockedMUIPopper.mockClear()
    mockedUsePicassoRoot.mockReturnValue(rootDiv)
  })

  it('creates useStyle hook properly', () => {
    expect(mockedMakeStyles).toHaveBeenCalledTimes(1)
    expect(mockedMakeStyles).toHaveBeenCalledWith(styles, {
      name: 'PicassoPopper'
    })
  })

  describe('when container prop is passed', () => {
    it('calls MUIPopper with passed container', () => {
      const container = document.createElement('div')

      renderComponent({
        container
      })

      expect(mockedMUIPopper).toHaveBeenCalledTimes(1)
      expect(mockedMUIPopper).toHaveBeenCalledWith(
        {
          ...defaultPopperProps,
          container
        },
        {}
      )
    })
  })

  describe('when container prop is NOT passed', () => {
    it('calls MUIPopper with default root container', () => {
      renderComponent({
        container: undefined
      })

      expect(mockedMUIPopper).toHaveBeenCalledTimes(1)
      expect(mockedMUIPopper).toHaveBeenCalledWith(
        {
          ...defaultPopperProps,
          container: rootDiv
        },
        {}
      )
    })
  })

  describe('when custom width prop is passed', () => {
    it('calls MUIPopper with custom width style', () => {
      renderComponent({
        width: '400px'
      })

      expect(mockedMUIPopper).toHaveBeenCalledTimes(1)
      expect(mockedMUIPopper).toHaveBeenCalledWith(
        {
          ...defaultPopperProps,
          style: {
            width: '400px'
          }
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
          autoWidth: false
        })

        expect(mockedMUIPopper).toHaveBeenCalledTimes(1)
        expect(mockedMUIPopper).toHaveBeenCalledWith(
          {
            ...defaultPopperProps,
            style: {}
          },
          {}
        )
      })
    })
  })
})
