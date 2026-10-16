import { format, plugins } from 'pretty-format'

import serializer from './input-empty-value-serializer.cjs'

const print = (node: Element) =>
  format(node, { plugins: [serializer, plugins.DOMElement] })

const elementFrom = (html: string) => {
  const wrapper = document.createElement('div')

  wrapper.innerHTML = html

  return wrapper
}

describe('input-empty-value-serializer', () => {
  it('drops an empty value attribute from inputs at any depth', () => {
    const wrapper = elementFrom(
      '<input value="" /><label><input value="" /></label>'
    )

    expect(print(wrapper)).not.toContain('value=""')
  })

  it('keeps an input value that is not empty', () => {
    expect(print(elementFrom('<input value="x" />'))).toContain('value="x"')
  })

  it('leaves an empty option value alone, since it is meaningful there', () => {
    expect(
      print(elementFrom('<select><option value=""></option></select>'))
    ).toContain('value=""')
  })

  it('prints a clone and never touches the original node', () => {
    const wrapper = elementFrom('<input value="" />')

    print(wrapper)

    expect(wrapper.querySelector('input')?.getAttribute('value')).toBe('')
  })

  it('declines everything without an empty input value', () => {
    expect(serializer.test(null)).toBe(false)
    expect(serializer.test('value=""')).toBe(false)
    expect(serializer.test(document.createElement('div'))).toBe(false)
  })
})
