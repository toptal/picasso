import { ReactElement } from 'react'
import { renderHook } from '@testing-library/react-hooks'

import { ASTType } from '../../types'
import useRichText from './useRichText'

describe('useRichText', () => {
  describe('AST value', () => {
    describe('not allowed tags', () => {
      it('returns the unmapped tag', () => {
        const tree = ({
          type: 'root',
          children: [
            {
              type: 'element',
              tagName: 'h1',
              properties: {},
              children: [{ type: 'text', value: 'foobar' }]
            }
          ]
        } as unknown) as ASTType
        const { result } = renderHook(() => useRichText(tree))

        const header = result.current as ReactElement

        expect(header.type).toEqual('h1')
        expect(header.props.children).toEqual(['foobar'])
      })
    })
    describe('allowed tags', () =>
      (['p', 'h3', 'strong', 'em', 'ul', 'ol', 'li'] as const).forEach(tag => {
        it(`maps ${tag} with proper Picasso component`, () => {
          const tree: ASTType = {
            type: 'root',
            children: [
              {
                type: 'element',
                tagName: tag,
                properties: {},
                children: [{ type: 'text', value: 'foobar' }]
              }
            ]
          }

          const { result } = renderHook(() => useRichText(tree))

          const element = result.current as ReactElement
          const componentName = tag.charAt(0).toUpperCase() + tag.slice(1)

          expect((element.type as Function).name).toEqual(componentName)
          expect(element.props.children).toEqual(['foobar'])
        })
      }))
    it('handles mulltiple children', () => {
      const tree: ASTType = {
        type: 'root',
        children: [
          {
            type: 'element',
            tagName: 'h3',
            properties: {},
            children: [{ type: 'text', value: 'foo' }]
          },
          {
            type: 'element',
            tagName: 'p',
            properties: {},
            children: [{ type: 'text', value: 'bar' }]
          }
        ]
      }

      const { result } = renderHook(() => useRichText(tree))

      const [headerElement, paragraphElement] = result.current as [
        ReactElement,
        ReactElement
      ]

      expect((headerElement.type as Function).name).toEqual('H3')
      expect(headerElement.props.children).toEqual(['foo'])
      expect((paragraphElement.type as Function).name).toEqual('P')
      expect(paragraphElement.props.children).toEqual(['bar'])
    })
    it('handles children recursively', () => {
      const tree: ASTType = {
        type: 'root',
        children: [
          {
            type: 'element',
            tagName: 'ul',
            properties: {},
            children: [
              {
                type: 'element',
                tagName: 'li',
                properties: {},
                children: [{ type: 'text', value: 'foo' }]
              },
              {
                type: 'element',
                tagName: 'li',
                properties: {},
                children: [{ type: 'text', value: 'bar' }]
              }
            ]
          }
        ]
      }

      const { result } = renderHook(() => useRichText(tree))

      const ulElement = result.current as ReactElement
      const [liElementFirst, liElementSecond] = ulElement.props.children as [
        ReactElement,
        ReactElement
      ]

      expect((ulElement.type as Function).name).toEqual('Ul')
      expect((liElementFirst.type as Function).name).toEqual('Li')
      expect(liElementFirst.props.children).toEqual(['foo'])
      expect((liElementSecond.type as Function).name).toEqual('Li')
      expect(liElementSecond.props.children).toEqual(['bar'])
    })
  })

  describe('HTML value', () => {
    describe('invalid HTML string', () => {
      it('returns null', () => {
        const html = 'foobar'
        const { result } = renderHook(() => useRichText(html))

        expect(result.current).toBeNull()
      })
    })

    describe('valid HTML string', () => {
      it('returns valid Picasso components', () => {
        const html = '<h3>heading</h3><p>normal</p>'
        const { result } = renderHook(() => useRichText(html))

        const [headerElement, paragraphElement] = result.current as [
          ReactElement,
          ReactElement
        ]

        expect((headerElement.type as Function).name).toEqual('H3')
        expect(headerElement.props.children).toEqual(['heading'])
        expect((paragraphElement.type as Function).name).toEqual('P')
        expect(paragraphElement.props.children).toEqual(['normal'])
      })
    })
  })
})
