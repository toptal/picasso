import React from 'react'
import { render } from '@toptal/picasso-test-utils'
import {SPACING_6} from '@toptal/picasso/utils'
import { describe, expect, it } from '@jest/globals'

import { Container } from './Container'

const testId = 'container'

describe('Container', () => {
  it('renders default container', () => {
    const { container } = render(<Container>Some text</Container>)

    expect(container).toMatchSnapshot()
  })

  describe('when gap is passed as string', () => {
    it('renders container with mapped gap class', () => {
      const { getByTestId } = render(<Container data-testid={testId} gap='small'>Some text</Container>)


      expect(getByTestId(testId).classList).toContain('gap-4')
    })
  })
  describe('when gap is passed as number', () => {
    it('renders container with gap as style attribute', () => {
      const { getByTestId } = render(<Container data-testid={testId} gap={1}>Some text</Container>)

      expect(getByTestId(testId).style).toContain('gap: 1rem;')

    })
  })
  describe('when gap is passed as BASE spacing', () => {
    it('renders container with proper gap class', () => {
      const { getByTestId } = render(<Container data-testid={testId} gap={SPACING_6}>Some text</Container>)

      expect(getByTestId(testId).classList).toContain('gap-6')
    })
  })
  describe('when gap is passed as responsive BASE spacing', () => {
    it('renders container with proper gap class', () => {
      // TODO update this
      const { getByTestId } = render(<Container data-testid={testId} gap={SPACING_6}>Some text</Container>)

      expect(getByTestId(testId).classList).toContain('gap-6')
    })
  })
})
