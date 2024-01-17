import type { ReactNode } from 'react'
import React from 'react'
import { render, act } from '@toptal/picasso-test-utils'
import { Tooltip } from '@toptal/picasso-tooltip'
import { Typography } from '@toptal/picasso-typography'
import { isOverflown } from '@toptal/picasso-utils'

import { TypographyOverflow } from '.'

jest.mock('../Tooltip', () => {
  return {
    __esModule: true,
    default: jest.fn(({ children, ...rest }: { children: ReactNode }) => (
      <span {...rest}>{children}</span>
    )),
  }
})
jest.mock('../Typography', () => {
  return {
    __esModule: true,
    default: jest.fn(({ children }: { children: ReactNode }) => (
      <span>{children}</span>
    )),
  }
})
jest.mock('../utils', () => ({
  __esModule: true,
  isOverflown: jest.fn(() => true),
}))

const mockedTooltip = Tooltip as unknown as jest.Mock<
  ReturnType<typeof Tooltip>
>
const mockedTypography = Typography as unknown as jest.Mock<
  ReturnType<typeof Typography>
>
const mockedIsOverflown = isOverflown as jest.Mock<
  ReturnType<typeof isOverflown>
>

describe('TypographyOverflow', () => {
  describe('initial render', () => {
    it('renders only typography', () => {
      render(
        <TypographyOverflow
          tooltipContent={<p data-testid='tooltip' />}
          data-testid='typography'
        >
          Just Typography
        </TypographyOverflow>
      )

      expect(mockedTooltip).toHaveBeenCalledTimes(0)
      expect(mockedTypography).toHaveBeenCalledTimes(1)
    })
  })

  describe('when overflow happened', () => {
    describe('when mouse is entered a typography and mouse left the tooltip', () => {
      it('renders tooltip and then close it', () => {
        mockedIsOverflown.mockReturnValueOnce(true)

        render(
          <TypographyOverflow
            tooltipContent={<p data-testid='tooltip' />}
            data-testid='typography'
          >
            Just Typography
          </TypographyOverflow>
        )

        act(() => {
          mockedTypography.mock.calls[0][0].onMouseEnter({
            currentTarget: true,
          })
        })

        expect(mockedTooltip).toHaveBeenCalledTimes(1)
        expect(mockedTypography).toHaveBeenCalledTimes(1)

        act(() => {
          mockedTooltip.mock.calls[0][0].onClose()
          mockedTooltip.mock.calls[0][0].onTransitionExited()
        })

        expect(mockedTooltip).toHaveBeenCalledTimes(1)
        expect(mockedTypography).toHaveBeenCalledTimes(2)
      })
    })

    describe('when mouse is NOT entered a typography', () => {
      it('does not render tooltip', () => {
        mockedIsOverflown.mockReturnValueOnce(false)

        render(
          <TypographyOverflow
            tooltipContent={<p data-testid='tooltip' />}
            data-testid='typography'
          >
            Just Typography
          </TypographyOverflow>
        )

        act(() => {
          mockedTypography.mock.calls[0][0].onMouseEnter({
            currentTarget: true,
          })
        })

        expect(mockedTooltip).toHaveBeenCalledTimes(0)
        expect(mockedTypography).toHaveBeenCalledTimes(1)
      })
    })
  })

  describe('when tooltip is disabled', () => {
    it('does not render tooltip', () => {
      mockedIsOverflown.mockReturnValueOnce(true)

      render(
        <TypographyOverflow
          disableTooltip
          tooltipContent={<p data-testid='tooltip' />}
          data-testid='typography'
        >
          Just Typography
        </TypographyOverflow>
      )

      act(() => {
        mockedTypography.mock.calls[0][0].onClick({ currentTarget: true })
      })

      expect(mockedTooltip).toHaveBeenCalledTimes(0)
      expect(mockedTypography).toHaveBeenCalledTimes(1)
    })
  })
})
