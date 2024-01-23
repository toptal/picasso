import type { ComponentProps } from 'react'
import React from 'react'
import type { PicassoConfig } from '@toptal/picasso-test-utils'
import { render } from '@toptal/picasso-test-utils'
import * as titleCaseModule from 'ap-style-title-case'
import { Link, MemoryRouter as Router } from 'react-router-dom'

import { OverviewBlock } from './OverviewBlock'

jest.mock('ap-style-title-case')

const renderOverviewBlock = (
  props: ComponentProps<typeof OverviewBlock>,
  picassoConfig?: PicassoConfig
) => {
  return render(
    <Router>
      <OverviewBlock {...props} />
    </Router>,
    undefined,
    picassoConfig
  )
}

let spiedOnTitleCase: jest.SpyInstance

describe('overview-block', () => {
  beforeEach(() => {
    spiedOnTitleCase = jest.spyOn(titleCaseModule, 'default')
  })

  afterEach(() => {
    spiedOnTitleCase.mockReset()
  })

  it('should transform text to title case when Picasso titleCase property is true', () => {
    const LABEL_TEXT = 'abc dj4'

    renderOverviewBlock(
      { value: 'abc co5', label: LABEL_TEXT },
      { titleCase: true }
    )

    expect(spiedOnTitleCase).toHaveBeenCalledWith(LABEL_TEXT)
  })

  it('should not transform text to title case when Picasso titleCase property is true but the component property overrides it', () => {
    renderOverviewBlock(
      { value: 'abc dk9', label: 'abc ps0', titleCase: false },
      { titleCase: true }
    )

    expect(spiedOnTitleCase).toHaveBeenCalledTimes(0)
  })

  describe('when label is a ReactNode', () => {
    it('renders custom label', () => {
      const customLabel = <div data-testid='custom-label'>Custom Label</div>

      const { getByTestId } = renderOverviewBlock({
        value: 'abc dk9',
        label: customLabel,
      })

      expect(getByTestId('custom-label')).toBeInTheDocument()
    })
  })

  describe('when OnClick function is defined', () => {
    describe('when `as` prop is defined', () => {
      it('render the element as `Link`', () => {
        const { getByTestId } = renderOverviewBlock({
          value: 'abc dk9',
          label: 'abc ps0',
          as: Link,
          onClick: jest.fn(),
          to: '/',
          'data-testid': 'overview-block',
        })
        const block = getByTestId('overview-block')

        // By the Link component to -> href
        expect(block).toHaveAttribute('href', '/')
        expect(block.nodeName).toBe('A')
      })
    })

    describe('when `as` prop is undefined', () => {
      it('render the element as `button`', () => {
        const { getByTestId } = renderOverviewBlock({
          value: 'abc dk9',
          label: 'abc ps0',
          onClick: jest.fn(),
          'data-testid': 'overview-block',
        })

        expect(getByTestId('overview-block').nodeName).toBe('BUTTON')
      })
    })
  })

  describe('when OnClick function is undefined', () => {
    it('renders the element as `div`', () => {
      const { getByTestId } = renderOverviewBlock({
        value: 'abc dk9',
        label: 'abc ps0',
        'data-testid': 'overview-block',
      })

      expect(getByTestId('overview-block').nodeName).toBe('DIV')
    })

    it('renders the element as `Link`', () => {
      const { getByTestId } = renderOverviewBlock({
        as: Link,
        to: '/',
        'data-testid': 'overview-block',
      })
      const block = getByTestId('overview-block')

      // By the Link component to -> href
      expect(block).toHaveAttribute('href', '/')
      expect(block.nodeName).toBe('A')
    })
  })
})
