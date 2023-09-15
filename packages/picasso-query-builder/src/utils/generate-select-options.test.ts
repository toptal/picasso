import type { OptionGroup, Option } from 'react-querybuilder'

import { generateSelectOptions } from './generate-select-options'

const options: Option[] = [
  {
    name: 'certifications',
    label: 'Certifications',
  },
  {
    name: 'age',
    label: 'Age',
  },
]

const optionGroup: OptionGroup[] = [
  {
    label: 'filter',
    options: options,
  },
]

describe('generateSelectOptions', () => {
  describe('when options is undefined', () => {
    it('returns an empty array', () => {
      const response = generateSelectOptions()

      expect(response).toEqual([])
    })
  })

  describe('when options are an optionGroupArray', () => {
    it('returns options properly formatted', () => {
      const response = generateSelectOptions(optionGroup)

      expect(response).toEqual({
        filter: [
          {
            value: 'certifications',
            text: 'Certifications',
          },
          {
            value: 'age',
            text: 'Age',
          },
        ],
      })
    })
  })

  describe('when options are not an optionGroupArray', () => {
    it('returns options properly formatted', () => {
      const response = generateSelectOptions(options)

      expect(response).toEqual([
        {
          value: 'certifications',
          text: 'Certifications',
        },
        {
          value: 'age',
          text: 'Age',
        },
      ])
    })
  })
})
