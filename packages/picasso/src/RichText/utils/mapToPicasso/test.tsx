import React, { ReactElement } from 'react'
import { TestingPicasso, render } from '@toptal/picasso/test-utils'

import mapToPicasso from './mapToPicasso'

describe('mapToPicasso', () => {
  describe('map allowed tags to custom components', () =>
    ['p', 'h3', 'strong', 'em', 'ul', 'ol', 'li'].forEach(tag => {
      it(`replaces ${tag} with picasso component`, () => {
        const jsx: ReactElement = React.createElement('div', { key: 'foo' }, [
          'foo',
          React.createElement(tag, { key: 'bar' }, ['bar'])
        ])
        const mappedJSX = mapToPicasso(jsx)

        const { container } = render(
          <TestingPicasso>{mappedJSX}</TestingPicasso>
        )

        const stringElement = mappedJSX[0]
        const strongElement = mappedJSX[1] as React.ReactElement
        const componentName = [...tag]
          .map((letter, index) => (index === 0 ? letter.toUpperCase() : letter))
          .join('')

        expect(stringElement).toEqual('foo')
        expect((strongElement.type as Function).name).toEqual(componentName)
        expect(container.querySelector(tag)).toHaveTextContent('bar')
      })
    }))

  it('goes through children recursively', () => {
    const jsx: ReactElement = React.createElement('div', { key: 'foo' }, [
      'foo',
      React.createElement('ul', { key: 'bar' }, [
        React.createElement('li', { key: 'foo' }, [
          'this is ',
          React.createElement('strong', { key: 'strong' }, ['bold'])
        ])
      ])
    ])
    const mappedJSX = mapToPicasso(jsx)

    const { container } = render(<TestingPicasso>{mappedJSX}</TestingPicasso>)

    const stringElement = mappedJSX[0]
    const ulElement = mappedJSX[1] as React.ReactElement
    const liElement = ulElement.props.children[0]
    const [liStringElement, liStrongElement] = liElement.props.children

    expect(stringElement).toEqual('foo')
    expect((ulElement.type as Function).name).toEqual('Ul')
    expect((liElement.type as Function).name).toEqual('Li')
    expect(typeof liStringElement).toEqual('string')
    expect((liStrongElement.type as Function).name).toEqual('Strong')
    expect(container.querySelector('ul li')).toMatchSnapshot()
  })
})
