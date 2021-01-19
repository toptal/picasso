import React from 'react'
import { render, fireEvent, RenderResult } from '@toptal/picasso/test-utils'
import { OmitInternalProps } from '@toptal/picasso-shared'

import ShowMore, { Props } from './ShowMore'

const renderShowMore = (props: OmitInternalProps<Props>) => {
  const {
    children,
    rows,
    initialExpanded,
    onToggle,
    moreText,
    lessText,
    disableToggle
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
      onToggle
    })

    const toggleText = getByText('Show more')

    fireEvent.click(toggleText)

    expect(onToggle).toHaveBeenCalledTimes(1)
  })
})

describe('ShowMore', () => {
  let api: RenderResult

  beforeEach(() => {
    api = renderShowMore({
      children:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis tenetur est asperiores. Inventore quam vel neque voluptatum, tenetur consectetur sapiente veniam, sint expedita voluptate reiciendis illum numquam officia obcaecati dicta? Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis tenetur est asperiores. Inventore quam vel neque voluptatum, tenetur consectetur sapiente veniam, sint expedita voluptate reiciendis illum numquam officia obcaecati dicta?'
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
        initialExpanded: true
      })

      expect(container).toMatchSnapshot()
    })

    describe('when show less link is clicked', () => {
      it('should render collapsed version', () => {
        const { container, getByText } = renderShowMore({
          children:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis tenetur est asperiores. Inventore quam vel neque voluptatum, tenetur consectetur sapiente veniam, sint expedita voluptate reiciendis illum numquam officia obcaecati dicta? Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis tenetur est asperiores. Inventore quam vel neque voluptatum, tenetur consectetur sapiente veniam, sint expedita voluptate reiciendis illum numquam officia obcaecati dicta?',
          initialExpanded: true
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
        disableToggle: true
      })

      expect(container).toMatchSnapshot()
    })
  })

  describe('when custom showMore text is specified', () => {
    it('should render with custom action link', () => {
      const { container } = renderShowMore({
        children:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis tenetur est asperiores. Inventore quam vel neque voluptatum, tenetur consectetur sapiente veniam, sint expedita voluptate reiciendis illum numquam officia obcaecati dicta? Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis tenetur est asperiores. Inventore quam vel neque voluptatum, tenetur consectetur sapiente veniam, sint expedita voluptate reiciendis illum numquam officia obcaecati dicta?',
        moreText: 'Display everything'
      })

      expect(container).toMatchSnapshot()
    })
  })

  describe('when custom lessText text is specified', () => {
    it('should render with custom action link', () => {
      const { container } = renderShowMore({
        children:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis tenetur est asperiores. Inventore quam vel neque voluptatum, tenetur consectetur sapiente veniam, sint expedita voluptate reiciendis illum numquam officia obcaecati dicta? Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis tenetur est asperiores. Inventore quam vel neque voluptatum, tenetur consectetur sapiente veniam, sint expedita voluptate reiciendis illum numquam officia obcaecati dicta?',
        lessText: 'Hide overflow'
      })

      expect(container).toMatchSnapshot()
    })
  })
})
