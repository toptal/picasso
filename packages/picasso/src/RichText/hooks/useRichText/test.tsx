import { ReactElement } from 'react'
import { renderHook } from '@testing-library/react-hooks'

import { ASTType } from '../../types'
import useRichText from './useRichText'

describe('useRichText', () => {
  describe('not allowed tags', () => {
    it('returns the unmapped tag', () => {
      const tree = {
        type: 'root',
        children: [
          {
            type: 'element',
            tagName: 'h1',
            properties: {},
            children: [{ type: 'text', value: 'foobar' }]
          }
        ]
      } as unknown as ASTType
      const { result } = renderHook(() => useRichText(tree))

      const header = result.current as ReactElement

      expect(header.type).toBe('h1')
      expect(header.props.children).toEqual(['foobar'])
    })
  })
  describe('allowed tags', () => {
    ;(['p', 'h3', 'strong', 'em', 'ul', 'ol', 'li'] as const).forEach(tag => {
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
    })
  })

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

    expect((headerElement.type as Function).name).toBe('H3')
    expect(headerElement.props.children).toEqual(['foo'])
    expect((paragraphElement.type as Function).name).toBe('P')
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

    expect((ulElement.type as Function).name).toBe('Ul')
    expect((liElementFirst.type as Function).name).toBe('Li')
    expect(liElementFirst.props.children).toEqual(['foo'])
    expect((liElementSecond.type as Function).name).toBe('Li')
    expect(liElementSecond.props.children).toEqual(['bar'])
  })
  describe('when children are empty', () => {
    it('returns null', () => {
      const { result } = renderHook(() =>
        useRichText({
          type: 'root',
          children: []
        })
      )

      expect(result.current).toBeNull()
    })
  })

  describe('when children of child are empty', () => {
    it('returns correct node', () => {
      const tree: ASTType = {
        type: 'root',
        children: [
          {
            type: 'element',
            tagName: 'h3',
            properties: {},
            children: [{ type: 'text', value: 'foobar' }]
          },
          {
            type: 'element',
            tagName: 'br',
            properties: {},
            children: []
          }
        ]
      }

      const { result } = renderHook(() => useRichText(tree))

      const [headingElement, brElement] = result.current as [
        ReactElement,
        ReactElement
      ]

      expect((headingElement.type as Function).name).toBe('H3')
      expect(brElement.type).toBe('br')
    })
  })

  describe('when children are undefined', () => {
    it('returns null', () => {
      const { result } = renderHook(() =>
        useRichText({
          type: 'root'
        })
      )

      expect(result.current).toBeNull()
    })
  })
})
