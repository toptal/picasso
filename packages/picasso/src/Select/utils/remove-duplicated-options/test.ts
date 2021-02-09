import removeDuplicatedOptions from './remove-duplicated-options'

describe('removeDuplicatedOptions', () => {
  it('removes correctly', () => {
    const options = [
      { text: 'One', value: '1' },
      { text: 'Two', value: '2' },
      { text: 'Three', value: '3' }
    ]

    expect(removeDuplicatedOptions(options)).toEqual(options)
    expect(removeDuplicatedOptions([...options, ...options])).toEqual(options)
  })
})
