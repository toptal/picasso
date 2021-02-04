import React from 'react'
import { render, fireEvent } from '@toptal/picasso/test-utils'
import { OmitInternalProps } from '@toptal/picasso-shared'

import ShowMore, { Props } from './ShowMore'

const text =
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis tenetur est asperiores. Inventore quam vel neque voluptatum, tenetur consectetur sapiente veniam, sint expedita voluptate reiciendis illum numquam officia obcaecati dicta? Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis tenetur est asperiores. Inventore quam vel neque voluptatum, tenetur consectetur sapiente veniam, sint expedita voluptate reiciendis illum numquam officia obcaecati dicta?'
const longText = [text, text, text, text, text].join('\n')

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

describe('ShowMore', () => {
  it('renders', () => {
    const { container } = renderShowMore({
      children: longText
    })

    expect(container).toMatchSnapshot()
  })

  // TODO: fixme
  it.skip('shows truncated text', () => {
    const { getByText } = renderShowMore({
      children: longText
    })

    expect(getByText(longText)).toBeVisible()
  })

  describe('when text is too short to be truncated', () => {
    // TODO: fix it
    it.skip('should render without action link', async () => {
      const { queryByText } = renderShowMore({
        children: 'Clearly too short to be truncated'
      })

      expect(queryByText('Show less')).not.toBeInTheDocument()
      expect(queryByText('Show more')).not.toBeInTheDocument()
    })
  })

  describe('when show more link is clicked', () => {
    it('should render expanded version', () => {
      const { container, getByText } = renderShowMore({
        children: longText
      })
      const toggleText = getByText('Show more')

      fireEvent.click(toggleText)

      expect(container).toMatchSnapshot()
    })
  })

  describe('when expanded initially', () => {
    it('should render expanded version', () => {
      const { getByText, queryByText } = renderShowMore({
        children: longText,
        initialExpanded: true
      })

      expect(getByText('Show less')).toBeInTheDocument()
      expect(queryByText('Show more')).not.toBeInTheDocument()
    })

    it('shows not truncated text', () => {
      const { getByText } = renderShowMore({
        children: longText,
        initialExpanded: true
      })

      expect(getByText(longText)).toBeInTheDocument()
    })

    describe('when show less link is clicked', () => {
      // TODO: fix it, likely some RTL issue, might be fixed after upgrade
      it.skip('should render collapsed version', async () => {
        const { getByText } = renderShowMore({
          children: longText,
          rows: 10000
        })

        const toggleText = getByText('Show less')

        fireEvent.click(toggleText)

        expect(getByText('Show more')).toBeInTheDocument()
      })
    })
  })

  describe('when disableToggle prop is true', () => {
    it('should render version without action link', () => {
      const { queryByText } = renderShowMore({
        children: longText,
        disableToggle: true
      })

      expect(queryByText('Show more')).not.toBeInTheDocument()
      expect(queryByText('Show less')).not.toBeInTheDocument()
    })

    it('shows not truncated text', () => {
      const { getByText } = renderShowMore({
        children: longText,
        disableToggle: true
      })

      expect(getByText(longText)).toBeInTheDocument()
    })
  })

  describe('when custom showMore text is specified', () => {
    it('should render with custom action link', () => {
      const moreText = 'Display everything'
      const { getByText } = renderShowMore({
        children: longText,
        moreText
      })

      expect(getByText(moreText)).toBeInTheDocument()
    })
  })

  describe('when custom lessText text is specified', () => {
    it('should render with custom action link', () => {
      const lessText = 'Hide overflow'
      const { getByText } = renderShowMore({
        children: longText,
        lessText
      })

      fireEvent.click(getByText('Show more'))

      expect(getByText(lessText)).toBeInTheDocument()
    })
  })

  describe('when onToggle function is passed', () => {
    it('should call onToggle after clicking on the action link', () => {
      const onToggle = jest.fn()
      const { getByText } = renderShowMore({
        children: longText,
        onToggle
      })

      const toggleText = getByText('Show more')

      fireEvent.click(toggleText)

      expect(onToggle).toHaveBeenCalledTimes(1)
    })
  })
})
