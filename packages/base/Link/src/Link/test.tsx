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

  it('adds rel="noopener" to target="_blank" links in its absence', () => {
    render(
      <Link href='http://example.com' target='_blank'>
        External Link
      </Link>
    )

    expect(document.querySelector('a')).toHaveAttribute('rel', 'noopener')
  })

  it('does not add rel="noopener" to target="_blank" if noreferrer is present', () => {
    render(
      <Link href='http://example.com' target='_blank' rel='noreferrer'>
        External Link
      </Link>
    )

    expect(document.querySelector('a')).not.toHaveAttribute('rel', 'noopener')
  })

  it('does not allow onClick when disabled', () => {
    const onClick = jest.fn()
    const { getByTestId } = render(
      <Link data-testid='foo' onClick={onClick} href='https://foo.bar' disabled>
        Test
      </Link>
    )

    fireEvent.click(getByTestId('foo'))
    expect(onClick).not.toHaveBeenCalled()
  })

  it('does not have href when disabled', () => {
    const { getByTestId } = render(
      <Link data-testid='foo' href='https://foo.bar' disabled>
        Test
      </Link>
    )

    expect(getByTestId('foo')).not.toHaveAttribute('href')
  })
})

describe('calculateViewModel', () => {
  it('should apply default values when no props are provided', () => {
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

  it('should apply correct href, target, rel and onClick when provided', () => {
    const props = {
      href: 'https://example.com',
      target: '_blank',
      rel: 'nofollow',
      onClick: jest.fn(),
    }
    const result = calculateViewModel(props)

    expect(result.href).toBe('https://example.com')
    expect(result.target).toBe('_blank')
    expect(result.rel).toBe('nofollow noopener')
    expect(result.onClick).toBe(props.onClick)
  })

  it('should sanitize rel for target="_blank"', () => {
    const props = {
      target: '_blank',
      rel: 'nofollow',
    }
    const result = calculateViewModel(props)

    expect(result.rel).toBe('nofollow noopener')
  })

  it('should apply disabled behavior', () => {
    const props = {
      disabled: true,
      href: 'https://example.com',
      target: '_blank',
      onClick: jest.fn(),
    }
    const result = calculateViewModel(props)

    expect(result.className).toContain('cursor-not-allowed')
    expect(result.href).toBeUndefined()
    expect(result.target).toBeUndefined()
    expect(result.onClick).toBeUndefined()
    expect(result.ariaDisabled).toBe(true)
  })

  it('should apply visited class when visited is true', () => {
    const props = {
      visited: true,
      color: 'blue',
    }
    const result = calculateViewModel(props)

    expect(result.className).toContain('visited text-purple-500')
  })

  it('should handle noUnderline properly', () => {
    const props = {
      noUnderline: true,
      color: 'blue',
    }
    const result = calculateViewModel(props)

    expect(result.className).toContain('!no-underline')
  })

  it('should apply correct weight based on variant', () => {
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

  it('should use default values if an unsupported color or variant is provided', () => {
    const props = {
      color: 'unsupportedColor',
      variant: 'unsupportedVariant',
    }
    const result = calculateViewModel(props)

    expect(result.className).toContain('text-blue-500')
    expect(result.weight).toBe('inherit')
  })

  it('should apply custom className if provided', () => {
    const props = {
      className: 'custom-class',
    }
    const result = calculateViewModel(props)

    expect(result.className).toContain('custom-class')
  })

  it('should apply tabIndex when provided', () => {
    const props = {
      tabIndex: 0,
    }
    const result = calculateViewModel(props)

    expect(result.tabIndex).toBe(0)
  })

  it('should include additional native HTML attributes', () => {
    const props = {
      'data-test-id': 'link-element',
    }
    const result = calculateViewModel(props)

    expect(result.nativeHTMLAttributes['data-test-id']).toBe('link-element')
  })
})
