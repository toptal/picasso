import React from 'react'
import { TestingPicasso, render } from '@toptal/picasso/test-utils'

import mapToPicasso from './mapToPicasso'

describe('mapToPicasso', () => {
  describe('map allowed tags to custom components', () =>
    ['p', 'h3', 'strong', 'em', 'ul', 'ol', 'li'].forEach(tag => {
      it(`replaces ${tag} with picasso component`, () => {
        const jsx = React.createElement('div', { key: 'foo' }, [
          'foo',
          React.createElement(tag, { key: 'bar' }, ['bar'])
        ])
        const mappedJSX = mapToPicasso(jsx) as React.ReactNodeArray

        const { container } = render(
          <TestingPicasso>{mappedJSX}</TestingPicasso>
        )

        const stringElement = mappedJSX[0]
        const strongElement = mappedJSX[1] as React.ReactElement

        expect(stringElement).toEqual('foo')
        expect(strongElement.type).not.toEqual(tag)
        expect(typeof strongElement.type).toEqual('function')
        expect(container.querySelector(tag)).toHaveTextContent('bar')
      })
    }))

  it('goes through children recursively', () => {
    const jsx = React.createElement('div', { key: 'foo' }, [
      'foo',
      React.createElement('ul', { key: 'bar' }, [
        React.createElement('li', { key: 'foo' }, [
          'this is ',
          React.createElement('strong', { key: 'strong' }, ['bold'])
        ])
      ])
    ])
    const mappedJSX = mapToPicasso(jsx) as React.ReactNodeArray

    const { container } = render(<TestingPicasso>{mappedJSX}</TestingPicasso>)

    const stringElement = mappedJSX[0]
    const ulElement = mappedJSX[1] as React.ReactElement
    const liElement = ulElement.props.children[0]
    const [liStringElement, liStrongElement] = liElement.props.children

    expect(stringElement).toEqual('foo')
    expect(typeof ulElement.type).toEqual('function')
    expect(typeof liElement.type).toEqual('function')
    expect(typeof liStringElement).toEqual('string')
    expect(typeof liStrongElement.type).toEqual('function')
    expect(container.querySelector('ul li')).toHaveTextContent('this is bold')
  })
})
