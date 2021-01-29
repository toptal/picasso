import React, { ComponentProps } from 'react'
import { render, PicassoConfig } from '@toptal/picasso/test-utils'
import * as titleCaseModule from 'ap-style-title-case'
import { Link, MemoryRouter as Router } from 'react-router-dom'

import OverviewBlock from './OverviewBlock'

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

describe('OverviewBlock', () => {
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

  describe('when OnClick function is defined', () => {
    describe('when `as` prop is defined', () => {
      it('render the element as `Link`', () => {
        const { getByTestId } = renderOverviewBlock({
          value: 'abc dk9',
          label: 'abc ps0',
          as: Link,
          onClick: jest.fn(),
          to: '/',
          'data-testid': 'OverviewBlock'
        })
        const block = getByTestId('OverviewBlock')

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
          'data-testid': 'OverviewBlock'
        })

        expect(getByTestId('OverviewBlock').nodeName).toBe('BUTTON')
      })
    })
  })

  describe('when OnClick function is undefined', () => {
    describe('when `active` prop is undefined', () => {
      it('renders the element as `div`', () => {
        const { getByTestId } = renderOverviewBlock({
          value: 'abc dk9',
          label: 'abc ps0',
          'data-testid': 'OverviewBlock'
        })

        expect(getByTestId('OverviewBlock').nodeName).toBe('DIV')
      })
    })

    describe('when `active` prop is true', () => {
      it('renders the element as `button`', () => {
        const { getByTestId } = renderOverviewBlock({
          value: 'abc dk9',
          label: 'abc ps0',
          active: true,
          'data-testid': 'OverviewBlock'
        })

        expect(getByTestId('OverviewBlock').nodeName).toBe('BUTTON')
      })
    })
  })
})
