import { getQueryDepth } from './get-query-depth'

const twoDepthLevelQuery = {
  rules: [
    {
      rules: [
        {
          field: 'certificates',
          operator: 'includeMatching',
          value: 'test',
        },
      ],
      combinator: 'and',
      not: false,
    },
  ],
  combinator: 'and',
}

const zeroDepthLevelQuery = {
  rules: [],
  combinator: 'and',
}

const fourDepthLevelQuery = {
  rules: [
    {
      id: 'faf834a2-d3d3-4636-8462-56af5dacb19e',
      field: 'certificates',
      operator: 'includeMatching',
      value: 'test',
    },
    {
      id: '034eebab-bbbb-4948-b9e2-d28ccb7e0515',
      rules: [
        {
          id: '038c89ed-b057-43de-8b79-2893dd7eb058',
          field: 'certificates',
          operator: 'includeMatching',
          value: 'test',
        },
        {
          id: '3484ff52-82ff-4114-bf04-8eadb99ee253',
          rules: [
            {
              id: '51d0aee0-bb61-4f0b-83b2-3652a27ae652',
              field: 'certificates',
              operator: 'includeMatching',
              value: 'test',
            },
            {
              id: '04d6b35c-1ecd-431a-ab1b-6c8835acc8ab',
              rules: [
                {
                  id: 'ebd2bcdd-7470-4c83-8fa1-2d9d2f127e44',
                  field: 'certificates',
                  operator: 'includeMatching',
                  value: 'test',
                },
              ],
              combinator: 'and',
              not: false,
            },
          ],
          combinator: 'and',
          not: false,
        },
      ],
      combinator: 'and',
      not: false,
    },
  ],
  combinator: 'and',
  id: '84ffdab1-1e68-4cf5-b944-f63924274571',
}

describe('getDepth', () => {
  it('returns depth level corectly', () => {
    expect(getQueryDepth(zeroDepthLevelQuery)).toBe(0)
    expect(getQueryDepth(twoDepthLevelQuery)).toBe(2)
    expect(getQueryDepth(fourDepthLevelQuery)).toBe(4)
  })
})
