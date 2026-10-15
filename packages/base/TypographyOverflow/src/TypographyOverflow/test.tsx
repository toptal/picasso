import type { ReactNode, Ref } from 'react'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { render, act, screen } from '@toptal/picasso-test-utils'
import { Tooltip } from '@toptal/picasso-tooltip'
import { Typography } from '@toptal/picasso-typography'
import { isOverflown } from '@toptal/picasso-utils'

import { TypographyOverflow } from '.'

jest.mock('@toptal/picasso-tooltip', () => {
  return {
    __esModule: true,
    Tooltip: jest.fn(({ children, ...rest }: { children: ReactNode }) => (
      <span {...rest}>{children}</span>
    )),
  }
})
jest.mock('@toptal/picasso-typography', () => {
  const { forwardRef } = jest.requireActual('react')

  return {
    __esModule: true,
    Typography: forwardRef(jest.fn()),
  }
})
jest.mock('@toptal/picasso-utils', () => ({
  __esModule: true,
  ...jest.requireActual('@toptal/picasso-utils'),
  isOverflown: jest.fn(() => true),
}))

const mockedTooltip = Tooltip as unknown as jest.Mock<
  ReturnType<typeof Tooltip>
>
const mockedTypography = (Typography as unknown as { render: jest.Mock }).render
const mockedIsOverflown = isOverflown as jest.Mock<
  ReturnType<typeof isOverflown>
>

const SAFARI_USER_AGENT =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15'

const mockPointer = (pointer: boolean) =>
  jest
    .spyOn(window, 'matchMedia')
    .mockReturnValue({ matches: pointer } as MediaQueryList)

const mockSafari = ({ pointer }: { pointer: boolean }) => {
  jest.spyOn(navigator, 'vendor', 'get').mockReturnValue('Apple Computer, Inc.')
  jest.spyOn(navigator, 'userAgent', 'get').mockReturnValue(SAFARI_USER_AGENT)
  mockPointer(pointer)
}

const getLayer = (container: HTMLElement) =>
  container.querySelector('[aria-hidden="true"]')

const getRootClasses = () =>
  mockedTypography.mock.calls.at(-1)[0].className.split(' ')

describe('TypographyOverflow', () => {
  beforeEach(() => {
    mockedTypography.mockImplementation(
      ({ children }: { children: ReactNode }, ref: Ref<HTMLSpanElement>) => (
        <span ref={ref}>{children}</span>
      )
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
    it('applies titleCase', () => {
      render(<TypographyOverflow titleCase>invoice for</TypographyOverflow>)

      expect(screen.getByText('Invoice For')).toBeInTheDocument()
    })

    it('applies titleCase under the Safari layer', () => {
      mockSafari({ pointer: true })

      const { container } = render(
        <TypographyOverflow titleCase>invoice for</TypographyOverflow>
      )

      expect(getLayer(container)).not.toBeNull()
      expect(screen.getByText('Invoice For')).toBeInTheDocument()
    })

    it('keeps the text as written without titleCase', () => {
      render(<TypographyOverflow>invoice for</TypographyOverflow>)

      expect(screen.getByText('invoice for')).toBeInTheDocument()
    })
  })

  describe('Safari tooltip guard', () => {
    it('renders the text once and without a layer outside Safari', () => {
      mockPointer(true)

      const { container } = render(
        <TypographyOverflow>Just Typography</TypographyOverflow>
      )

      expect(getLayer(container)).toBeNull()
      expect(getRootClasses()).not.toContain('relative')
      expect(mockedTypography).toHaveBeenCalledTimes(1)
    })

    it('covers the text with a positioned layer in desktop Safari', () => {
      mockSafari({ pointer: true })

      const { container } = render(
        <TypographyOverflow>Just Typography</TypographyOverflow>
      )

      expect(getLayer(container)).toHaveClass('absolute', 'inset-0')
      expect(getRootClasses()).toContain('relative')
    })

    it('leaves the text uncovered on touch devices', () => {
      mockSafari({ pointer: false })

      const { container } = render(
        <TypographyOverflow>Just Typography</TypographyOverflow>
      )

      expect(getLayer(container)).toBeNull()
    })

    it.each([
      ['a link', <a href='#'>Link</a>],
      ['a button', <button type='button'>Button</button>],
      ['an input', <input />],
      ['a role="button" element', <span role='button'>Action</span>],
      ['a focusable element', <span tabIndex={0}>Focusable</span>],
    ])('keeps the layer and lifts %s above it', (_, control) => {
      mockSafari({ pointer: true })

      const { container } = render(
        <TypographyOverflow>{control} next to the text</TypographyOverflow>
      )
      const root = getLayer(container)?.parentElement as HTMLElement
      const liftedSelector = getRootClasses()
        .find(cls => cls.endsWith(']:relative'))
        ?.slice('[&_'.length, -']:relative'.length)

      expect(root.firstElementChild).toBe(getLayer(container))
      expect(root.querySelector(liftedSelector ?? 'none')).toBe(
        root.children[1]
      )
    })

    it('does not lift plain inline elements', () => {
      mockSafari({ pointer: true })

      const { container } = render(
        <TypographyOverflow>
          <strong>Bold</strong> next to the text
        </TypographyOverflow>
      )
      const liftedSelector = getRootClasses()
        .find(cls => cls.endsWith(']:relative'))
        ?.slice('[&_'.length, -']:relative'.length)

      expect(liftedSelector).toBeDefined()
      expect(container.querySelector(liftedSelector ?? 'none')).toBeNull()
    })

    it('leaves the text uncovered when disableTooltipGuard is set', () => {
      mockSafari({ pointer: true })

      const { container } = render(
        <TypographyOverflow disableTooltipGuard>
          Just Typography
        </TypographyOverflow>
      )

      expect(getLayer(container)).toBeNull()
    })

    it('leaves the text uncovered when the tooltip is disabled', () => {
      mockSafari({ pointer: true })

      const { container } = render(
        <TypographyOverflow disableTooltip>Just Typography</TypographyOverflow>
      )

      expect(getLayer(container)).toBeNull()
    })

    it('renders no layer on the server', () => {
      mockSafari({ pointer: true })
      // jsdom picks useLayoutEffect, which React warns about in renderToString
      jest.spyOn(console, 'error').mockImplementation(() => {})

      expect(
        renderToString(<TypographyOverflow>Just Typography</TypographyOverflow>)
      ).not.toContain('aria-hidden')
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
