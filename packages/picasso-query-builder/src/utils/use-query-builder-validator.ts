import { useCallback, useMemo } from 'react'
import type {
  RuleGroupTypeAny,
  RuleType,
  RuleValidator,
  ValidationResult,
} from 'react-querybuilder'

import type { Field } from '../types/query-builder'

type Props = {
  fields: Field[]
  onValidChange?: (isValid: boolean) => void
  onValidationResultChange?: (
    validationResult: Record<string, ValidationResult | boolean>
  ) => void
}

const validateRule = (
  rule: RuleType,
  fieldValidatorMap: Record<string, RuleValidator>
) => {
  const { field, id } = rule

  const fieldValidator = fieldValidatorMap[field]

  return {
    [id as string]: fieldValidator ? fieldValidator(rule) : true,
  }
}

const validateQuery = (
  query: RuleGroupTypeAny | RuleType,
  fieldValidatorMap: Record<string, RuleValidator>
): {
  [key: string]: ValidationResult | boolean
} => {
  const { rules, id } = query as RuleGroupTypeAny

  /**
   * Existence of rule means the query is a group, otherwise it's a rule
   */
  if (rules) {
    /**
     * ensure the group is not empty and validate each rule in the group
     */
    if (rules.length === 0) {
      return {
        [id as string]: {
          valid: false,
          reasons: ["A group can't be empty"],
        },
      }
    }

    const result = rules
      .map(rule => validateQuery(rule as RuleGroupTypeAny, fieldValidatorMap))
      .reduce(
        (acc, ruleResult) => ({
          ...acc,
          ...ruleResult,
        }),
        {}
      )

    return {
      [id as string]: true,
      ...result,
    }
  }

  /**
   * If the query is a rule, validate the rule
   */
  return validateRule(query as RuleType, fieldValidatorMap)
}

const useQueryBuilderValidator = ({
  fields,
  onValidChange,
  onValidationResultChange,
}: Props) => {
  const fieldValidatorMap = useMemo(() => {
    return fields.reduce(
      (acc, field) => ({
        ...acc,
        [field.name]: field.validator || null,
      }),
      {}
    )
  }, [fields])

  return useCallback(
    (queryToValidate: RuleGroupTypeAny) => {
      const validationResult = validateQuery(queryToValidate, fieldValidatorMap)

      const isValid = !Object.values(validationResult).some(
        result => result !== true
      )

      onValidChange?.(isValid)
      onValidationResultChange?.(validationResult)

      return isValid
    },
    [fieldValidatorMap, onValidChange, onValidationResultChange]
  )
}

export default useQueryBuilderValidator
