import React from 'react'
import type { RenderResult } from '@toptal/picasso-test-utils'
import { render, fireEvent, within } from '@toptal/picasso-test-utils'
import type { OmitInternalProps } from '@toptal/picasso-shared'

import type { Props } from './ShowMore'
import { ShowMore } from './ShowMore'

const renderShowMore = (props: OmitInternalProps<Props>) => {
  const {
    children,
    rows,
    initialExpanded,
    onToggle,
    moreText,
    lessText,
    disableToggle,
  } = props

  return render(
    <ShowMore
      rows={rows}
      initialExpanded={initialExpanded}
      onToggle={onToggle}
      moreText={moreText}
      lessText={lessText}
      disableToggle={disableToggle}
    >
      {children}
    </ShowMore>
  )
}

describe('when onToggle function is passed', () => {
  it('should call onToggle after clicking on the action link', () => {
    const onToggle = jest.fn()
    const { getByText } = renderShowMore({
      children:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis tenetur est asperiores. Inventore quam vel neque voluptatum, tenetur consectetur sapiente veniam, sint expedita voluptate reiciendis illum numquam officia obcaecati dicta? Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis tenetur est asperiores. Inventore quam vel neque voluptatum, tenetur consectetur sapiente veniam, sint expedita voluptate reiciendis illum numquam officia obcaecati dicta?',
      onToggle,
    })

    const toggleText = getByText('Show more')

    fireEvent.click(toggleText)

    expect(onToggle).toHaveBeenCalledTimes(1)
    expect(onToggle).toHaveBeenCalledWith(true)

    fireEvent.click(toggleText)
    expect(onToggle).toHaveBeenCalledTimes(2)
    expect(onToggle).toHaveBeenCalledWith(false)
  })
})

describe('ShowMore', () => {
  let api: RenderResult

  beforeEach(() => {
    api = renderShowMore({
      children:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis tenetur est asperiores. Inventore quam vel neque voluptatum, tenetur consectetur sapiente veniam, sint expedita voluptate reiciendis illum numquam officia obcaecati dicta? Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis tenetur est asperiores. Inventore quam vel neque voluptatum, tenetur consectetur sapiente veniam, sint expedita voluptate reiciendis illum numquam officia obcaecati dicta?',
    })
  })

  it('renders', () => {
    const { container } = api

    expect(container).toMatchSnapshot()
  })

  describe('when show more link is clicked', () => {
    it('should render expanded version', () => {
      const { container, getByText } = api
      const toggleText = getByText('Show more')

      fireEvent.click(toggleText)

      expect(container).toMatchSnapshot()
    })
  })

  describe('when initialExpanded prop is true', () => {
    it('should render expanded version', () => {
      const { container } = renderShowMore({
        children:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis tenetur est asperiores. Inventore quam vel neque voluptatum, tenetur consectetur sapiente veniam, sint expedita voluptate reiciendis illum numquam officia obcaecati dicta? Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis tenetur est asperiores. Inventore quam vel neque voluptatum, tenetur consectetur sapiente veniam, sint expedita voluptate reiciendis illum numquam officia obcaecati dicta?',
        initialExpanded: true,
      })

      expect(container).toMatchSnapshot()
    })

    describe('when show less link is clicked', () => {
      it('should render collapsed version', () => {
        const { container, getByText } = renderShowMore({
          children:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis tenetur est asperiores. Inventore quam vel neque voluptatum, tenetur consectetur sapiente veniam, sint expedita voluptate reiciendis illum numquam officia obcaecati dicta? Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis tenetur est asperiores. Inventore quam vel neque voluptatum, tenetur consectetur sapiente veniam, sint expedita voluptate reiciendis illum numquam officia obcaecati dicta?',
          initialExpanded: true,
        })
        const toggleText = getByText('Show less')

        fireEvent.click(toggleText)

        expect(container).toMatchSnapshot()
      })
    })
  })

  describe('when disableToggle prop is true', () => {
    it('should render version without action link', () => {
      const { container } = renderShowMore({
        children:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis tenetur est asperiores. Inventore quam vel neque voluptatum, tenetur consectetur sapiente veniam, sint expedita voluptate reiciendis illum numquam officia obcaecati dicta? Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis tenetur est asperiores. Inventore quam vel neque voluptatum, tenetur consectetur sapiente veniam, sint expedita voluptate reiciendis illum numquam officia obcaecati dicta?',
        disableToggle: true,
      })

      expect(container).toMatchSnapshot()
    })
  })

  describe('when custom showMore text is specified', () => {
    it('should render with custom action link', () => {
      const { container } = renderShowMore({
        children:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis tenetur est asperiores. Inventore quam vel neque voluptatum, tenetur consectetur sapiente veniam, sint expedita voluptate reiciendis illum numquam officia obcaecati dicta? Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis tenetur est asperiores. Inventore quam vel neque voluptatum, tenetur consectetur sapiente veniam, sint expedita voluptate reiciendis illum numquam officia obcaecati dicta?',
        moreText: 'Display everything',
      })

      expect(container).toMatchSnapshot()
    })
  })

  describe('when custom lessText text is specified', () => {
    it('should render with custom action link', () => {
      const { container } = renderShowMore({
        children:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis tenetur est asperiores. Inventore quam vel neque voluptatum, tenetur consectetur sapiente veniam, sint expedita voluptate reiciendis illum numquam officia obcaecati dicta? Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis tenetur est asperiores. Inventore quam vel neque voluptatum, tenetur consectetur sapiente veniam, sint expedita voluptate reiciendis illum numquam officia obcaecati dicta?',
        lessText: 'Hide overflow',
      })

      expect(container).toMatchSnapshot()
    })
  })

  describe('when the content can be measured', () => {
    const stubLayout = (box: {
      width: number
      height: number
      scrollHeight: number
    }) => {
      jest
        .spyOn(Element.prototype, 'clientWidth', 'get')
        .mockReturnValue(box.width)
      jest
        .spyOn(Element.prototype, 'scrollWidth', 'get')
        .mockReturnValue(box.width)
      jest
        .spyOn(Element.prototype, 'clientHeight', 'get')
        .mockReturnValue(box.height)
      jest
        .spyOn(Element.prototype, 'scrollHeight', 'get')
        .mockReturnValue(box.scrollHeight)
    }

    afterEach(() => {
      jest.restoreAllMocks()
    })

    it('shows the toggle when the content overflows', () => {
      stubLayout({ width: 300, height: 88, scrollHeight: 132 })

      const { container } = renderShowMore({ children: 'Long text' })

      expect(within(container).getByText('Show more')).toBeInTheDocument()
    })

    it('hides the toggle for empty content', () => {
      stubLayout({ width: 300, height: 0, scrollHeight: 0 })

      const { container } = renderShowMore({ children: '' })

      expect(within(container).queryByText('Show more')).not.toBeInTheDocument()
    })

    it('hides the toggle for content that fits while a transform scales it', () => {
      stubLayout({ width: 300, height: 44, scrollHeight: 44 })
      // A popup's scale-in: the rendered rect is smaller than the layout box
      jest
        .spyOn(Element.prototype, 'getBoundingClientRect')
        .mockReturnValue({ width: 225, height: 33 } as DOMRect)

      const { container } = renderShowMore({ children: 'Two lines of text' })

      expect(within(container).queryByText('Show more')).not.toBeInTheDocument()
    })
  })
})
