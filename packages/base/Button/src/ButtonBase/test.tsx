import React from 'react'
import { render, fireEvent } from '@toptal/picasso-test-utils'
import type { OmitInternalProps } from '@toptal/picasso-shared'
import { useTitleCase } from '@toptal/picasso-shared'
import { Link } from '@toptal/picasso-link'
import { toTitleCase } from '@toptal/picasso-utils'

import type { Props } from './ButtonBase'
import { ButtonBase } from './ButtonBase'

jest.mock('@toptal/picasso-shared', () => ({
  __esModule: true,
  ...jest.requireActual('@toptal/picasso-shared'),
  useTitleCase: jest.fn(value => value),
}))

jest.mock('@toptal/picasso-utils', () => ({
  __esModule: true,
  ...jest.requireActual('@toptal/picasso-utils'),
  noop: jest.fn(),
  toTitleCase: jest.fn(value => `__TITLE_CASE__${value}`),
}))

const useTitleCaseMocked = useTitleCase as jest.Mocked<typeof useTitleCase>
const toTitleCaseMocked = toTitleCase as jest.Mocked<typeof toTitleCase>

const renderButton = (props: OmitInternalProps<Props>) => {
  const { children, disabled, loading, onClick, titleCase, as, href, ...rest } =
    props

  return render(
    <ButtonBase
      disabled={disabled}
      loading={loading}
      onClick={onClick}
      titleCase={titleCase}
      as={as}
      href={href}
      {...rest}
    >
      {children}
    </ButtonBase>,
    undefined
  )
}

describe('ButtonBase', () => {
  beforeEach(() => {
    useTitleCaseMocked.mockReturnValue(false)
    toTitleCaseMocked.mockImplementation(value => {
      return `__TITLE_CASE__${value}`
    })
  })

  afterEach(() => {
    useTitleCaseMocked.mockRestore()
    toTitleCaseMocked.mockRestore()
  })

  describe('when "as" prop is passed', () => {
    describe('when "as" prop equals "a"', () => {
      it('renders Button as a', () => {
        const { container } = renderButton({
          children: 'Click me!',
          as: 'a',
          href: '/',
        })

        expect(container).toMatchSnapshot()
      })
    })

    describe('when "as" prop equals "Link" component', () => {
      it('renders Button as a', () => {
        const onClick = jest.fn()
        const { container, getByText } = renderButton({
          children: 'Click me!',
          as: Link,
          href: 'URL',
          onClick,
        })

        expect(container).toMatchSnapshot()

        fireEvent.click(getByText('Click me!'))

        expect(onClick).toHaveBeenCalled()
      })

      describe('when "href" prop is empty', () => {
        it('renders Button as a', () => {
          const onClick = jest.fn()
          const { container, getByText } = renderButton({
            children: 'Click me!',
            as: Link,
            href: '',
            onClick,
          })

          expect(container).toMatchSnapshot()

          fireEvent.click(getByText('Click me!'))

          expect(onClick).toHaveBeenCalled()
        })
      })

      describe('when "disabled" prop is true', () => {
        it('renders Button as a and does not trigger onClick handler', () => {
          const onClick = jest.fn()
          const { container, getByText } = renderButton({
            children: 'Click me!',
            as: Link,
            href: 'URL',
            onClick,
            disabled: true,
          })

          expect(container).toMatchSnapshot()

          fireEvent.click(getByText('Click me!'))

          expect(onClick).not.toHaveBeenCalled()
        })
      })
    })

    describe('when "as" prop does not equal "button"', () => {
      describe('when "href" prop is passed', () => {
        it('renders Button as a link', () => {
          const { container } = renderButton({
            children: 'Click me!',
            as: 'span',
            href: '/',
          })

          expect(container).toMatchSnapshot()
        })
      })

      describe('when "to" prop is passed', () => {
        it('renders Button as a link', () => {
          const { container } = renderButton({
            children: 'Click me!',
            as: 'span',
            to: '/',
          })

          expect(container).toMatchSnapshot()
        })
      })
    })
  })

  describe('when "role" prop is passed', () => {
    it('renders Button with a custom role', () => {
      const { container } = renderButton({
        children: 'Click me!',
        role: 'custom',
      })

      expect(container).toMatchSnapshot()
    })
  })

  describe('when "disabled" prop is true', () => {
    it('renders Button and does not trigger onClick handler', () => {
      const onClick = jest.fn()
      const { container, getByText } = renderButton({
        children: 'Click me!',
        onClick,
        disabled: true,
      })

      expect(container).toMatchSnapshot()

      fireEvent.click(getByText('Click me!'))

      expect(onClick).not.toHaveBeenCalled()
    })
  })

  describe('when "disabled" prop is false', () => {
    it('renders Button and does not trigger onClick handler', () => {
      const onClick = jest.fn()
      const { container, getByText } = renderButton({
        children: 'Click me!',
        onClick,
        disabled: false,
      })

      expect(container).toMatchSnapshot()

      fireEvent.click(getByText('Click me!'))

      expect(onClick).toHaveBeenCalledTimes(1)
    })
  })

  describe('when "loading" prop is true', () => {
    it('renders Button with loading state and does not trigger onClick handler', () => {
      const onClick = jest.fn()
      const { container, getByText } = renderButton({
        children: 'Click me!',
        onClick,
        loading: true,
      })

      expect(container).toMatchSnapshot()

      fireEvent.click(getByText('Click me!'))

      expect(onClick).toHaveBeenCalledTimes(0)
    })
  })

  describe('when "titleCase" prop is true', () => {
    it('renders Button with transformed text to title case', () => {
      useTitleCaseMocked.mockReturnValue(true)
      const TEXT_CONTENT = 'Test bk9'

      const { container } = renderButton({
        children: TEXT_CONTENT,
        titleCase: true,
      })

      expect(container).toMatchSnapshot()
    })
  })
})
