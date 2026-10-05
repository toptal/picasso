import React, { isValidElement } from 'react'

import flattenFragments from './flatten-fragments'

const Part = ({ name }: { name: string }) => <span>{name}</span>

const getNames = (nodes: React.ReactNode[]) =>
  nodes.map(node =>
    isValidElement<{ name: string }>(node) ? node.props.name : node
  )

describe('flattenFragments', () => {
  it('unwraps the parts of nested fragments in order', () => {
    const flat = flattenFragments(
      <>
        <Part name='a' />
        <>
          <Part name='b' />
          <Part name='c' />
        </>
        <Part name='d' />
      </>
    )

    expect(getNames(flat)).toEqual(['a', 'b', 'c', 'd'])
  })

  it('keys each part by the fragment it came from', () => {
    const flat = flattenFragments([
      <React.Fragment key='first'>
        <Part name='a' />
      </React.Fragment>,
      <React.Fragment key='second'>
        <Part name='b' />
      </React.Fragment>,
    ])
    const keys = flat.map(node => (isValidElement(node) ? node.key : null))

    expect(new Set(keys).size).toBe(2)
  })

  it('leaves children without a fragment as they are', () => {
    const part = <Part name='a' key='a' />

    expect(flattenFragments(part)).toEqual([
      expect.objectContaining({ props: { name: 'a' } }),
    ])
  })
})
