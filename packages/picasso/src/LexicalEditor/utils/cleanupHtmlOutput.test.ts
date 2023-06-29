import { cleanupHtmlOutput } from './cleanupHtmlOutput'

const tests = [
  // removeWhat (string), removeFrom (string), input, expected
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
    'multiple <span> tags',
    '<p> > <span>',
    '<p><span>italic </span><i><em>text</em></i><span> test</span></p>',
    '<p>italic <em>text</em> test</p>',
  ],
]

describe('cleanupHtmlOutput', () => {
  it.each(tests)(
    'removes %s from %s combinations',
    (what, from, input, expected) => {
      const result = cleanupHtmlOutput(input)

      expect(result).toBe(expected)
    }
  )
})
