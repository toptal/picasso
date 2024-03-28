import variantToElement, { DEFAULT_ELEMENT } from './variant-to-element'

describe('variantToElement', () => {
  it('maps variants to elements correctly', () => {
    expect(variantToElement('heading', 'small')).toBe('h4')
    expect(variantToElement('heading', 'medium')).toBe('h3')
    expect(variantToElement('heading', 'large')).toBe('h2')
    expect(variantToElement('heading', 'xlarge')).toBe('h1')

    expect(variantToElement('body', 'small')).toBe(DEFAULT_ELEMENT)
    expect(variantToElement('body', 'medium')).toBe(DEFAULT_ELEMENT)
    expect(variantToElement('body', 'large')).toBe(DEFAULT_ELEMENT)
    expect(variantToElement('body', 'inherit')).toBe(DEFAULT_ELEMENT)
  })
})
