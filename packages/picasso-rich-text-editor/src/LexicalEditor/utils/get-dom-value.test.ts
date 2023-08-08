import type { ASTType } from '../../RichText'
import { getDomValue } from './get-dom-value'

describe('getDomValue', () => {
  it('returns DOM structure from AST', () => {
    const inputValue: ASTType = {
      type: 'root',
      children: [{ type: 'text', value: 'Example of default text' }],
    }

    const result = getDomValue(inputValue)
    const serializer = new XMLSerializer()

    expect(serializer.serializeToString(result)).toBe(
      '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>Example of default text</body></html>'
    )
  })
})
