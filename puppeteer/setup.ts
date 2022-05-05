import { configureToMatchImageSnapshot } from 'jest-image-snapshot'

const toMatchImageSnapshot = configureToMatchImageSnapshot({
  comparisonMethod: 'ssim'
})

// const toMatchImageSnapshot = configureToMatchImageSnapshot({
//   comparisonMethod: 'pixelmatch'
// })

expect.extend({ toMatchImageSnapshot })

jest.setTimeout(10000)
