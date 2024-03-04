import toMuiVariant from './to-mui-variant'

describe('toMuiVariant', () => {
  it('maps variants correctly', () => {
    expect(toMuiVariant('heading', 'small')).toBe('h4')
    expect(toMuiVariant('heading', 'medium')).toBe('h3')
    expect(toMuiVariant('heading', 'large')).toBe('h2')
    expect(toMuiVariant('heading', 'xlarge')).toBe('h1')

    expect(toMuiVariant('body', 'small')).toBe('body1')
    expect(toMuiVariant('body', 'medium')).toBe('body1')
    expect(toMuiVariant('body', 'large')).toBe('body1')
    expect(toMuiVariant('body', 'inherit')).toBe('body1')
  })
})
