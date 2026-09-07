import { format, plugins } from 'pretty-format'

import guard from './jss-serializer-guard.cjs'

describe('jss-serializer-guard', () => {
  it('declines null and undefined instead of throwing', () => {
    expect(guard.test(null)).toBe(false)
    expect(guard.test(undefined)).toBe(false)
  })

  it('still delegates to the davinci-qa serializer for elements', () => {
    const div = document.createElement('div')

    div.className = 'Button-root-42 plain'

    expect(format(div, { plugins: [guard, plugins.DOMElement] })).toContain(
      'class="Button-root plain"'
    )
  })
})
