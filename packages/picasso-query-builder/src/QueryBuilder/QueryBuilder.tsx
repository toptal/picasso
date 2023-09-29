import React, { useEffect, useCallback, useState } from 'react'
import type { ComponentType } from 'react'
import { Container } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso/utils'
import type {
  ValueEditorProps,
  Field as QueryBuilderField,
  RuleGroupTypeAny,
  Operator,
  ValidationResult,
} from 'react-querybuilder'
import {
  QueryBuilder as ReactQueryBuilder,
  defaultOperators,
  remove,
} from 'react-querybuilder'
import { QueryBuilderDnD } from '@react-querybuilder/dnd'
import * as ReactDnD from 'react-dnd'
import * as ReactDndHtml5Backend from 'react-dnd-html5-backend'
import { makeStyles } from '@material-ui/core/styles'
import cx from 'classnames'

import type { QueryBuilderContext, Field } from '../types/query-builder'
import { RunQueryButton } from '../RunQueryButton'
import { ClearQueryButton } from '../ClearQueryButton'
import { ControlElementsContext } from '../ControlElementsContext'
import { emptyQueryBuilderQuery } from '../utils/constants'
import { ValueEditor } from '../ValueEditor'
import { ValidationErrors } from '../ValidationErrors'
import {
  controlClassnames,
  getQueryDepth,
  useQueryBuilderValidator,
} from '../utils'
import styles from './styles'

type Props = {
  /** Defines array of fields to build a query. Each filed is an object with a list of properties. */
  fields: Field[]
  /** Defines a set of rules which will be used to fetch data, a combinator and a query id. */
  query: RuleGroupTypeAny
  /** Defines a function that is called when the user makes a change to the query in the UI. This function receives an updated query as an argument. */
  onQueryChange: (newQuery: RuleGroupTypeAny) => void
  /** Defines a function that is called when validation status changes. Receives a boolean argument `isValid` */
  onValidationChange?: (isValid: boolean) => void
  /** Defines a function that is called when QB resets to its default state */
  onQueryReset?: () => void
  /** Defines a limit for depth of nested rule groups in QB. By default is set to 3. */
  maxGroupDepth?: number
  /** Defines a function that returns an array of operator objects that could be used to construct queries. */
  getOperators?: (fields: Field[], fieldName: string) => Operator[]
  /** Defines a function that is called when the user submits a query constructed in the QB. This function takes a single argument - constructed query. */
  onSubmit?: (query: RuleGroupTypeAny) => void
  /** Defines a component that allows possibility to customize value editor that is used in QB. By default, QB provides default set of editors (text inputs, dropdowns, etc.). */
  customValueEditor?: ComponentType<ValueEditorProps>
  /** Defines a function that allows customized validation for the user input in the QB. It helps to provide some custom validation rules to enforce specific constraints. Receives a query as an argument which represents the full query constructed by the user, including any rules and logical operators. */
  customValidator?: (query: RuleGroupTypeAny) => boolean
  /** Defines the loading state. */
  loading?: boolean
  /** Defines the possibility to display, or not, any of the controls. For example "Add rule" or "Add group" control. */
  hideControls?: boolean
  /** Defines the possibility to enable, or not, drag-and-drop functionality. This possibility applies to rules and groups to rearrange it within QB. */
  enableDragAndDrop?: boolean
  /** Defines the possibility to reset, or not, operator and value fields when the user changes the field selection for a rule. */
  resetOnFieldChange?: boolean
  /** Defines the total number of results, usually used by other components that may need to know the total number of results. */
  totalCount?: number
  /** Defines the possibility to display a loading indicator or message to the user while the total count is being fetched. */
  totalCountLoading?: boolean
  testIds?: {
    addRuleButton?: string
    select?: string
    multiSelect?: string
  }
}

const useStyles = makeStyles(styles)

const QueryBuilder = ({
  fields,
  query,
  onQueryChange,
  onValidationChange,
  getOperators,
  maxGroupDepth = 3,
  loading = false,
  onSubmit,
  customValueEditor,
  customValidator,
  hideControls,
  enableDragAndDrop = false,
  resetOnFieldChange,
  totalCount,
  totalCountLoading,
  onQueryReset,
  testIds,
}: Props) => {
  const classes = useStyles()

  const [queryBuilderValid, setIsQueryBuilderValid] = useState<
    boolean | undefined
  >()
  const [validationErrors, setValidationErrors] = useState<
    Record<string, ValidationResult | boolean>
  >({})
  const [submitButtonClicked, setSubmitButtonClicked] = useState(false)

  const { showError } = useNotifications()

  const queryBuilderValidator = useQueryBuilderValidator({
    onValidChange: setIsQueryBuilderValid,
    fields,
    onValidationResultChange: setValidationErrors,
  })

  const resetQuery = useCallback(() => {
    if (onQueryReset) {
      onQueryReset()
    }

    onQueryChange(emptyQueryBuilderQuery)
  }, [onQueryChange, onQueryReset])

  const removeGroup = useCallback(
    (path: number[]) => {
      if (query) {
        onQueryChange(remove(query, path))
      }
    },
    [query, onQueryChange]
  )

  const handleSubmit = useCallback(() => {
    setSubmitButtonClicked(true)

    if (!queryBuilderValid) {
      showError(<ValidationErrors validationResult={validationErrors} />)

      return
    }
    if (onSubmit && query) {
      onSubmit(query)
    }
  }, [queryBuilderValid, onSubmit, query, showError, validationErrors])

  const handleQueryChange = useCallback(
    (changedQuery: RuleGroupTypeAny) => {
      // subtract one because we do not count top level query as depth level 1
      // object depth level is not exactly the query depth level
      const level = getQueryDepth(changedQuery) - 1

      if (level > maxGroupDepth) {
        return showError(
          `Can not exceed maximum group depth (${maxGroupDepth})`
        )
      }
      onQueryChange(changedQuery)
    },
    [maxGroupDepth, onQueryChange, showError]
  )

  const resetSubmitButtonClicked = useCallback(() => {
    setSubmitButtonClicked(false)
  }, [])

  const customValidatorHandler = (queryToValidate: RuleGroupTypeAny) => {
    if (customValidator) {
      const result = customValidator(queryToValidate)

      setIsQueryBuilderValid(result)

      return result
    }

    return false
  }

  const getDisabledFields = () => {
    return fields
      .filter(field => {
        if (field?.disabled === true) {
          return field.name
        }
      })
      .map(disabledField => disabledField.name)
  }

  useEffect(() => {
    if (queryBuilderValid !== undefined) {
      onValidationChange?.(queryBuilderValid)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryBuilderValid])

  return (
    <ControlElementsContext>
      <Container
        className={cx(classes.global, classes.root)}
        flex
        padded={hideControls ? undefined : 'medium'}
        direction='column'
        gap='small'
      >
        <QueryBuilderDnD dnd={{ ...ReactDnD, ...ReactDndHtml5Backend }}>
          <ReactQueryBuilder
            resetOnFieldChange={resetOnFieldChange}
            fields={fields as QueryBuilderField[]}
            addRuleToNewGroups
            controlClassnames={controlClassnames}
            query={query}
            validator={
              customValidator ? customValidatorHandler : queryBuilderValidator
            }
            onQueryChange={handleQueryChange}
            showCloneButtons
            getOperators={(fieldName: string) => {
              if (getOperators) {
                return getOperators(fields, fieldName)
              }

              return defaultOperators
            }}
            context={
              {
                removeGroup,
                maxDepth: maxGroupDepth,
                queryBuilderValid,
                submitButtonClicked,
                resetSubmitButtonClicked,
                getDisabledFields,
                testIds,
              } as QueryBuilderContext
            }
            controlElements={{
              valueEditor: customValueEditor || ValueEditor,
            }}
            enableDragAndDrop={enableDragAndDrop}
          />
        </QueryBuilderDnD>
        {!hideControls && (
          <Container flex justifyContent='flex-end'>
            <ClearQueryButton onClick={resetQuery} />
            <RunQueryButton
              onClick={handleSubmit}
              loading={loading}
              totalCount={totalCount}
              totalCountLoading={totalCountLoading}
            />
          </Container>
        )}
      </Container>
    </ControlElementsContext>
  )
}

export default QueryBuilder
