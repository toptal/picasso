import { cleanupHtmlOutput } from './cleanup-html-output'

// Test cases structure:
// removeWhat (string), removeFrom (string), input (string), expected (string)
const testCases = [
  [
    '<i>',
    '<i> > <em>',
    '<p><i><em>italic text</em></i></p>',
    '<p><em>italic text</em></p>',
  ],
  [
    '<b>',
    '<b> > <strong>',
    '<p><b><strong>Heading 1 with 🧙🏼‍♂️</strong></b></p>',
    '<p><strong>Heading 1 with 🧙🏼‍♂️</strong></p>',
  ],
  ['<span>', '<h3> > <span>', '<h3><span>test</span></h3>', '<h3>test</h3>'],
  ['<span>', '<p> > <span>', '<p><span>test</span></p>', '<p>test</p>'],
  [
    '<span>',
    '<pre> > <span>',
    '<pre><span>test</span></pre>',
    '<pre>test</pre>',
  ],
  [
    '<span>',
    '<code> > <span>',
    '<code><span>test</span></code>',
    '<code>test</code>',
  ],
  [
    'multiple <span> tags',
    '<p> > <span>',
    '<p><span>italic </span><i><em>text</em></i><span> test</span></p>',
    '<p>italic <em>text</em> test</p>',
  ],
]

describe('cleanupHtmlOutput', () => {
  it.each(testCases)(
    'removes %s from %s combinations',
    (what, from, input, expected) => {
      const result = cleanupHtmlOutput(input)

      expect(result).toBe(expected)
    }
  )

  it('replaces <i> with <em> tag', () => {
    const result = cleanupHtmlOutput(
      '<p><i><em>test </em></i><i><b><strong>test</strong></b></i><span> test</span></p>'
    )

    expect(result).toBe(
      '<p><em>test </em><em><strong>test</strong></em> test</p>'
    )
  })

  it('hoists nested lists to previous sibling', () => {
    const result = cleanupHtmlOutput(`
      <ul>
        <li>first</li>
        <li>
          <ul>
            <li>second</li>
          </ul>
        </li>
      </ul>
    `).replace(/\s/g, '')

    const expected = `
      <ul>
        <li>
          first
          <ul>
            <li>second</li>
          </ul>
        </li>
      </ul>
    `.replace(/\s/g, '')

    expect(result).toBe(expected)
  })

  it('adds a safe rel to links that open in a new tab', () => {
    const html =
      '<p><a href="https://toptal.com" target="_blank">new tab</a><a href="https://toptal.com" target="_blank" rel="opener">opener</a><a href="https://toptal.com" rel="noreferrer">same tab</a></p>'

    expect(cleanupHtmlOutput(html)).toBe(
      '<p><a href="https://toptal.com" target="_blank" rel="noopener noreferrer">new tab</a><a href="https://toptal.com" target="_blank" rel="noopener noreferrer">opener</a><a href="https://toptal.com" rel="noreferrer">same tab</a></p>'
    )
  })
})
