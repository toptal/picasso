import type { RuleGroupTypeAny } from 'react-querybuilder'

export const getQueryDepth = (arr: RuleGroupTypeAny): number => {
  if (Array.isArray(arr)) {
    return 1 + Math.max(...arr.map(getQueryDepth))
  }

  if (typeof arr === 'object') {
    return Math.max(...Object.values(arr).map(getQueryDepth))
  }

  return 0
}
