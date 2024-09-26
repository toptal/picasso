import { useCallback, useMemo, useState } from 'react'
import type {
  RuleGroupTypeAny,
  RuleType,
  RuleValidator,
  ValidationResult,
} from 'react-querybuilder'
import { isRuleGroup } from 'react-querybuilder'

import type { Field } from '../types/query-builder'

type ValidatorMap = Record<string, RuleValidator>
export type ValidatorResult = Record<string, ValidationResult | boolean>

type Props = {
  fields: Field[]
}

const validateRule = (rule: RuleType, fieldValidatorMap: ValidatorMap) => {
  const { field, id } = rule

  const fieldValidator = fieldValidatorMap[field]

  return {
    [id as string]: fieldValidator ? fieldValidator(rule) : true,
  }
}

const validateQuery = (
  query: RuleGroupTypeAny | RuleType,
  fieldValidatorMap: ValidatorMap
): ValidatorResult => {
  /**
   * Existence of rule means the query is a group, otherwise it's a rule
   */
  if (isRuleGroup(query)) {
    const { rules, id } = query

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

const useQueryBuilderValidation = ({ fields }: Props) => {
  const [validationErrors, setValidationErrors] = useState<ValidatorResult>({})
  const [queryBuilderValid, setIsQueryBuilderValid] = useState<
    boolean | undefined
  >()
  const fieldValidatorMap: ValidatorMap = useMemo(() => {
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
      if (!queryToValidate) {
        return false
      }

      const valResult = validateQuery(queryToValidate, fieldValidatorMap)

      const isValid = !Object.values(valResult).some(result => result !== true)

      setIsQueryBuilderValid?.(isValid)
      setValidationErrors?.(valResult)

      return isValid
    },
    [fieldValidatorMap]
  )

  return { validator, validationErrors, queryBuilderValid }
}

export default useQueryBuilderValidation
