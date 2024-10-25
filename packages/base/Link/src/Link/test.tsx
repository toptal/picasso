import React from 'react'
import { render, fireEvent } from '@toptal/picasso-test-utils'
import { MemoryRouter, Link as RouterLink } from 'react-router-dom'

import { calculateViewModel } from './Link'
import { Link } from '../Link'

describe('Link', () => {
  it('renders', () => {
    const { container } = render(<Link>Please verify your email</Link>)

    expect(container).toMatchSnapshot()
  })

  describe('when native attributes are provided', () => {
    it('renders native attributes', () => {
      const { container } = render(
        <Link
          onBlur={() => window.alert('onBlur')}
          rel='noopener'
          target='_blank'
          download='filename'
          href='https://toptal.com/filename.txt'
        >
          Please verify your email
        </Link>
      )

      expect(container).toMatchSnapshot()
    })
  })

  describe('when using react-router Link', () => {
    it('renders a Link from react-router', () => {
      const { container } = render(
        <MemoryRouter>
          <div>
            <Link as={RouterLink} to='/'>
              Please verify your email
            </Link>
          </div>
        </MemoryRouter>
      )

      expect(container).toMatchSnapshot()
    })
  })

  describe('when disabled', () => {
    it('renders disabled link', () => {
      const { container } = render(
        <Link
          rel='noopener'
          target='_blank'
          download='filename'
          href='https://toptal.com/filename.txt'
          disabled
        >
          Please verify your email
        </Link>
      )

      expect(container).toMatchSnapshot()
    })

    it('does not allow onClick', () => {
      const onClick = jest.fn()
      const { getByTestId } = render(
        <Link
          data-testid='foo'
          onClick={onClick}
          href='https://foo.bar'
          disabled
        >
          Test
        </Link>
      )

      fireEvent.click(getByTestId('foo'))
      expect(onClick).not.toHaveBeenCalled()
    })

    it('does not have href', () => {
      const { getByTestId } = render(
        <Link data-testid='foo' href='https://foo.bar' disabled>
          Test
        </Link>
      )

      expect(getByTestId('foo')).not.toHaveAttribute('href')
    })
  })

  describe('when target="_blank"', () => {
    it('adds rel="noopener" if rel is absent', () => {
      render(
        <Link href='http://example.com' target='_blank'>
          External Link
        </Link>
      )
      expect(document.querySelector('a')).toHaveAttribute('rel', 'noopener')
    })

    it('does not add rel="noopener" if noreferrer is present', () => {
      render(
        <Link href='http://example.com' target='_blank' rel='noreferrer'>
          External Link
        </Link>
      )
      expect(document.querySelector('a')).not.toHaveAttribute('rel', 'noopener')
    })
  })
})

describe('calculateViewModel', () => {
  describe('when no props are provided', () => {
    it('applies default values', () => {
      const props = {}
      const result = calculateViewModel(props)

      expect(result.className).toContain('text-blue-500')
      expect(result.href).toBeUndefined()
      expect(result.target).toBeUndefined()
      expect(result.rel).toBeUndefined()
      expect(result.onClick).toBeUndefined()
      expect(result.weight).toBe('inherit')
      expect(result.ariaDisabled).toBeUndefined()
    })
  })

  describe('when href, target and onClick are provided', () => {
    it('passes them through to view model', () => {
      const props = {
        href: 'https://example.com',
        target: '_blank',
        onClick: jest.fn(),
      }
      const result = calculateViewModel(props)

      expect(result.href).toBe('https://example.com')
      expect(result.target).toBe('_blank')
      expect(result.onClick).toBe(props.onClick)
    })
  })

  describe('when target="_blank" and rel is provided', () => {
    it('sanitizes rel for target="_blank"', () => {
      const props = {
        target: '_blank',
        rel: 'nofollow',
      }
      const result = calculateViewModel(props)

      expect(result.rel).toBe('nofollow noopener')
    })
  })

  describe('when disabled', () => {
    it('applies disabled behavior', () => {
      const props = {
        disabled: true,
        href: 'https://example.com',
        target: '_blank',
        onClick: jest.fn(),
      }
      const result = calculateViewModel(props)

      expect(result.className).toContain('cursor-pointer')
      expect(result.href).toBeUndefined()
      expect(result.target).toBeUndefined()
      expect(result.onClick).toBeUndefined()
      expect(result.ariaDisabled).toBe(true)
    })

    it('applies disabled color styles for the provided color', () => {
      const blueProps = {
        color: 'blue',
        disabled: true,
      }
      const whiteProps = {
        color: 'white',
        disabled: true,
      }

      const blueResult = calculateViewModel(blueProps)
      const whiteResult = calculateViewModel(whiteProps)

      expect(blueResult.className).toContain(
        'focus:outline-none hover:underline leading-[inherit] text-gray-600 underline cursor-not-allowed'
      )
      expect(whiteResult.className).toContain('text-gray-600')
    })
  })

  describe('when visited is true', () => {
    it('applies visited class when color is blue', () => {
      const props = {
        visited: true,
        color: 'blue',
      }
      const result = calculateViewModel(props)

      expect(result.className).toContain('visited text-purple-500')
    })

    it('applies visited class when color is white', () => {
      const props = {
        color: 'white',
        visited: true,
      }
      const result = calculateViewModel(props)

      expect(result.className).toContain('visited text-gray-500')
    })
  })

  describe('when noUnderline is true', () => {
    it('handles noUnderline properly', () => {
      const props = {
        noUnderline: true,
        color: 'blue',
      }
      const result = calculateViewModel(props)

      expect(result.className).toContain('!no-underline')
    })
  })

  describe('when variant is provided', () => {
    it('applies correct weight based on variant', () => {
      const actionProps = {
        variant: 'action' as const,
      }
      const anchorProps = {
        variant: 'anchor' as const,
      }

      const actionResult = calculateViewModel(actionProps)
      const anchorResult = calculateViewModel(anchorProps)

      expect(actionResult.weight).toBe('semibold')
      expect(anchorResult.weight).toBe('inherit')
    })
  })

  describe('when unsupported color or variant is provided', () => {
    it('uses default values', () => {
      const props = {
        color: 'unsupportedColor',
        variant: 'unsupportedVariant',
      }
      const result = calculateViewModel(props)

      expect(result.className).toContain('text-blue-500')
      expect(result.weight).toBe('inherit')
    })
  })

  describe('when className is provided', () => {
    it('applies custom className', () => {
      const props = {
        className: 'custom-class',
      }
      const result = calculateViewModel(props)

      expect(result.className).toContain('custom-class')
    })
  })

  describe('when tabIndex is provided', () => {
    it('applies tabIndex', () => {
      const props = {
        tabIndex: 0,
      }
      const result = calculateViewModel(props)

      expect(result.tabIndex).toBe(0)
    })
  })

  describe('when additional native HTML attributes are provided', () => {
    it('includes them', () => {
      const props = {
        'data-test-id': 'link-element',
      }
      const result = calculateViewModel(props)

      expect(result.nativeHTMLAttributes['data-test-id']).toBe('link-element')
    })
  })

  describe('when "as" prop is provided', () => {
    it('applies the default "as" prop as "a" when no "as" prop is provided', () => {
      const props = {}
      const result = calculateViewModel(props)

      expect(result.as).toBe('a')
    })

    it('applies the provided "as" prop when a custom element type is given', () => {
      const props = {
        as: 'button',
      }
      const result = calculateViewModel(props)

      expect(result.as).toBe('button')
    })

    it('applies the provided "as" prop with a custom React component', () => {
      const CustomComponent = () => <div />
      const props = {
        as: CustomComponent,
      }
      const result = calculateViewModel(props)

      expect(result.as).toBe(CustomComponent)
    })
  })

  describe('when color prop is provided', () => {
    it('applies the default color "blue" when no color prop is provided', () => {
      const props = {}
      const result = calculateViewModel(props)

      expect(result.className).toContain('text-blue-500')
    })

    it('applies the white color when color="white" is provided', () => {
      const props = {
        color: 'white',
      }
      const result = calculateViewModel(props)

      expect(result.className).toContain('inherit')
    })

    it('fallbacks to the default color "blue" if an unsupported color is provided', () => {
      const props = {
        color: 'unsupportedColor',
      }
      const result = calculateViewModel(props)

      expect(result.className).toContain('text-blue-500')
    })
  })
})
