import { LineConfig } from '@toptal/picasso-charts'

import generateReferenceKey from './../generate-reference-key'
import toLineConfigFormat from './'

const LINE_CONFIG: LineConfig = {
  team: {
    color: 'orange',
    variant: 'solid'
  }
}

const REF_DATA = [
  {
    data: {
      '2020-10-20': 1.7,
      '2020-10-21': 2,
      '2020-10-22': 1.7,
      '2020-10-23': 2,
      '2020-10-24': 1.5,
      '2020-10-25': 1.3
    },
    color: 'red'
  },
  {
    data: {
      '2020-10-20': 1.7,
      '2020-10-21': 2,
      '2020-10-22': 1.7,
      '2020-10-23': 2,
      '2020-10-24': 1.5,
      '2020-10-25': 1.3
    },
    color: 'blue'
  }
]

describe('Name of the group', () => {
  it('convertsline config', () => {
    const EXPECTED_LINE_CONFIG = {
      ...LINE_CONFIG,
      [generateReferenceKey(0)]: { color: 'red', variant: 'reference' },
      [generateReferenceKey(1)]: { color: 'blue', variant: 'reference' }
    }

    const convertedLineConfig = toLineConfigFormat(LINE_CONFIG, REF_DATA)

    expect(convertedLineConfig).toEqual(EXPECTED_LINE_CONFIG)
  })
})
