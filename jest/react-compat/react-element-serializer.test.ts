import { format, plugins } from 'pretty-format'

import serializer from './react-element-serializer.cjs'

const react19Element = (type: string, props: Record<string, unknown>) => ({
  $$typeof: Symbol.for('react.transitional.element'),
  type,
  key: null,
  props,
})

const print = (value: unknown) =>
  format(value, { plugins: [serializer, plugins.ReactElement] })

describe('react-element-serializer', () => {
  it('prints a React 19 element as JSX, the way React 18 elements print', () => {
    const output = print(
      react19Element('div', { className: 'x', children: 'hi' })
    )

    expect(output.split('\n')).toEqual([
      '<div',
      '  className="x"',
      '>',
      '  hi',
      '</div>',
    ])
  })

  it('recurses into nested React 19 elements', () => {
    const output = print(
      react19Element('div', {
        children: react19Element('span', { children: 'in' }),
      })
    )

    expect(output).toContain('<span>')
    expect(output).not.toContain('$$typeof')
  })

  it('leaves React 18 elements and non-elements to the default plugins', () => {
    expect(serializer.test({ $$typeof: Symbol.for('react.element') })).toBe(
      false
    )
    expect(serializer.test(null)).toBe(false)
    expect(serializer.test('<div />')).toBe(false)
  })
})
