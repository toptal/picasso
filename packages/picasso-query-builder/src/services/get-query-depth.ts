import type { RuleGroupTypeAny } from 'react-querybuilder'

export const getQueryDepth = (arr: RuleGroupTypeAny): number => {
  return Array.isArray(arr)
    ? 1 + Math.max(...arr.map(getQueryDepth))
    : typeof arr === 'object'
    ? Math.max(...Object.values(arr).map(getQueryDepth))
    : 0
}
