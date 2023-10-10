import { useCallback, useMemo, useRef } from 'react'
import type {
  RuleGroupTypeAny,
  RuleType,
  RuleValidator,
  ValidationResult,
} from 'react-querybuilder'
import { isRuleGroup } from 'react-querybuilder'

import type { Field } from '../types/query-builder'

type Props = {
  fields: Field[]
  onValidationChange?: (isValid: boolean) => void
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
  if (isRuleGroup(query)) {
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

const useQueryBuilderValidator = ({ fields, onValidationChange }: Props) => {
  const validationResult = useRef<Record<string, ValidationResult | boolean>>(
    {}
  )

  const fieldValidatorMap = useMemo(() => {
    return fields.reduce(
      (acc, field) => ({
        ...acc,
        [field.name]: field.validator || null,
      }),
      {}
    )
  }, [fields])

  const validator = useCallback(
    (queryToValidate: RuleGroupTypeAny) => {
      const valResult = validateQuery(queryToValidate, fieldValidatorMap)

      const isValid = !Object.values(valResult).some(result => result !== true)

      onValidationChange?.(isValid)

      validationResult.current = valResult

      return isValid
    },
    [fieldValidatorMap, onValidationChange]
  )

  return { validator, validationResult: validationResult.current }
}

export default useQueryBuilderValidator
