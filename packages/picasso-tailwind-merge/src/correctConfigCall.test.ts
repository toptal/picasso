jest.doMock('tailwind-merge', () => {
  const originalModule = jest.requireActual('tailwind-merge')

  return {
    ...originalModule,
    extendTailwindMerge: jest.fn(originalModule.extendTailwindMerge),
  }
})

describe('extendTailwindMerge', () => {
  it('uses correct config', () => {
    const { extendTailwindMerge } = require('tailwind-merge')
    const { CONFIG } = require('./twMerge')

    expect(extendTailwindMerge).toHaveBeenCalledWith(CONFIG)
  })
})
