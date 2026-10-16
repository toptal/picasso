import type { ReactNode } from 'react'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { render, act, screen, TestingPicasso } from '@toptal/picasso-test-utils'
import { Tooltip } from '@toptal/picasso-tooltip'
import { Typography } from '@toptal/picasso-typography'
import { isOverflown } from '@toptal/picasso-utils'

import { TypographyOverflow } from '.'
import isSafari from './is-safari'

jest.mock('@toptal/picasso-tooltip', () => {
  return {
    __esModule: true,
    Tooltip: jest.fn(({ children, ...rest }: { children: ReactNode }) => (
      <span {...rest}>{children}</span>
    )),
  }
})
jest.mock('@toptal/picasso-typography', () => {
  return {
    __esModule: true,
    Typography: jest.fn(),
  }
})
jest.mock('./is-safari', () => ({
  __esModule: true,
  default: jest.fn(() => false),
}))
jest.mock('@toptal/picasso-utils', () => ({
  __esModule: true,
  ...jest.requireActual('@toptal/picasso-utils'),
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

const mockedIsSafari = isSafari as jest.Mock<ReturnType<typeof isSafari>>

const SAFARI_FIX_CLASSES = ['after:block', "after:content-['']"]

const mockSafari = () => {
  mockedIsSafari.mockReturnValue(true)
}

const getRootClasses = () =>
  mockedTypography.mock.calls.at(-1)?.[0].className.split(' ')

describe('TypographyOverflow', () => {
  beforeEach(() => {
    mockedTypography.mockImplementation(
      ({ children }: { children: ReactNode }) => <span>{children}</span>
    )
  })

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

    describe('when the pointer rests on a typography', () => {
      const getTypographyProps = () => mockedTypography.mock.lastCall?.[0]
      const isTooltipOpen = () => mockedTooltip.mock.lastCall?.[0].open

      const hover = () =>
        act(() => getTypographyProps().onMouseEnter({ currentTarget: true }))
      const wait = (ms: number) => act(() => jest.advanceTimersByTime(ms))

      beforeEach(() => {
        jest.useFakeTimers()
        mockedIsOverflown.mockReturnValue(true)
      })

      afterEach(() => {
        jest.useRealTimers()
      })

      it('opens the tooltip after the delay', () => {
        render(<TypographyOverflow>Just Typography</TypographyOverflow>)

        hover()
        wait(199)
        expect(isTooltipOpen()).toBe(false)

        wait(1)
        expect(isTooltipOpen()).toBe(true)
      })

      it('keeps a dismissed tooltip closed until the pointer leaves', () => {
        render(<TypographyOverflow>Just Typography</TypographyOverflow>)

        hover()
        wait(200)
        act(() => mockedTooltip.mock.lastCall?.[0].onClose())
        hover()
        wait(200)
        expect(isTooltipOpen()).toBe(false)

        act(() => getTypographyProps().onMouseLeave({}))
        hover()
        wait(200)
        expect(isTooltipOpen()).toBe(true)
      })

      it('does not open the tooltip when it is disabled', () => {
        render(
          <TypographyOverflow disableTooltip>
            Just Typography
          </TypographyOverflow>
        )

        hover()
        wait(200)

        expect(isTooltipOpen()).toBe(false)
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

  describe('title case', () => {
    const { Typography: ActualTypography } = jest.requireActual(
      '@toptal/picasso-typography'
    )

    beforeEach(() => {
      mockedTypography.mockImplementation(props =>
        ActualTypography.render(props, null)
      )
    })

    it('applies titleCase', () => {
      render(<TypographyOverflow titleCase>invoice for</TypographyOverflow>)

      expect(screen.getByText('Invoice For')).toBeInTheDocument()
    })

    it('applies titleCase in Safari', () => {
      mockSafari()

      render(<TypographyOverflow titleCase>invoice for</TypographyOverflow>)

      expect(getRootClasses()).toEqual(
        expect.arrayContaining(SAFARI_FIX_CLASSES)
      )
      expect(screen.getByText('Invoice For')).toBeInTheDocument()
    })

    it('keeps the text as written without titleCase', () => {
      render(<TypographyOverflow>invoice for</TypographyOverflow>)

      expect(screen.getByText('invoice for')).toBeInTheDocument()
    })
  })

  describe('Safari tooltip fix', () => {
    it('renders once and without the fix outside Safari', () => {
      render(<TypographyOverflow>Just Typography</TypographyOverflow>)

      expect(mockedTypography).toHaveBeenCalledTimes(1)
      expect(mockedTypography.mock.calls[0][0].className).not.toContain(
        'after:'
      )
    })

    it('adds an empty block after the text in Safari', () => {
      mockSafari()

      render(<TypographyOverflow>Just Typography</TypographyOverflow>)

      expect(getRootClasses()).toEqual(
        expect.arrayContaining(SAFARI_FIX_CLASSES)
      )
    })

    it('skips the fix for multiline text', () => {
      mockSafari()

      render(<TypographyOverflow lines={2}>Just Typography</TypographyOverflow>)

      expect(getRootClasses()).not.toContain('after:block')
    })

    it('skips the fix when the tooltip is disabled', () => {
      mockSafari()

      render(
        <TypographyOverflow disableTooltip>Just Typography</TypographyOverflow>
      )

      expect(getRootClasses()).not.toContain('after:block')
    })

    it('renders server HTML without the fix', () => {
      mockSafari()

      renderToString(
        <TestingPicasso>
          <TypographyOverflow>Just Typography</TypographyOverflow>
        </TestingPicasso>
      )

      expect(getRootClasses()).not.toContain('after:block')
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
