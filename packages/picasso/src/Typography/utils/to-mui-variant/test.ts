import toMuiVariant from './to-mui-variant'

describe('toMuiVariant', () => {
  it('maps variants correctly', () => {
    expect(toMuiVariant('heading', 'small')).toEqual('h4')
    expect(toMuiVariant('heading', 'medium')).toEqual('h3')
    expect(toMuiVariant('heading', 'large')).toEqual('h2')
    expect(toMuiVariant('heading', 'xlarge')).toEqual('h1')

    expect(toMuiVariant('body', 'small')).toEqual('body1')
    expect(toMuiVariant('body', 'medium')).toEqual('body1')
    expect(toMuiVariant('body', 'large')).toEqual('body1')
    expect(toMuiVariant('body', 'inherit')).toEqual('body1')
  })
})
