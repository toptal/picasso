import React, { useCallback, useEffect, useState } from 'react'
import type { ComponentType, ReactNode } from 'react'
import { Container } from '@toptal/picasso-container'
import { useNotifications } from '@toptal/picasso-notification'
import type {
  ValueEditorProps as DefaultValueEditorProps,
  Field as QueryBuilderField,
  RuleGroupTypeAny,
  Operator,
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
import type { SpacingType } from '@toptal/picasso-provider'
import { SPACING_6 } from '@toptal/picasso-provider'

import type { QueryBuilderContext, Field, TestId } from '../types/query-builder'
import { RunQueryButton } from '../RunQueryButton'
import { ClearQueryButton } from '../ClearQueryButton'
import { ControlElementsContext } from '../ControlElementsContext'
import { emptyQueryBuilderQuery } from '../utils/constants'
import type { QueryBuilderValueEditorProps as ValEditorProps } from '../ValueEditor'
import { ValueEditor as DefaultValEditor } from '../ValueEditor'
import { controlClassnames, useQueryBuilderValidator } from '../utils'
import styles from './styles'
import { useOnQueryChange } from './hooks/useOnQueryChange'
import { ValidationErrors } from '../ValidationErrors'

type ValueEditorComponentProps = ComponentType<DefaultValueEditorProps>

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
  valueEditor?: ValueEditorComponentProps
  /** Defines the loading state. */
  loading?: boolean
  /** Defines padded layout. */
  padded?: SpacingType
  /** Defines the possibility to display, or not, any of the controls. For example "Clear query" or "Run query" control. */
  hideControls?: boolean
  /** Defines the possibility to enable, or not, drag-and-drop functionality. This possibility applies to rules and groups to rearrange it within QB. */
  enableDragAndDrop?: boolean
  /** Defines custom Run Query button content that allows to change button text or display custom logic. */
  runQueryButtonContent?: ReactNode
  /** Adds a customized footer at the bottom of the query builder. */
  footer?: React.ReactNode
  /** Adds a customized header at the top of the query builder. */
  header?: React.ReactNode
  /** Defines the possibility to reset, or not, operator and value fields when the user changes the field selection for a rule. */
  resetOnFieldChange?: boolean
  testIds?: TestId
}

const useStyles = makeStyles(styles)

const ValueEditor = (props: ValEditorProps) => <DefaultValEditor {...props} />

const QueryBuilder = ({
  fields,
  query,
  onQueryChange,
  onValidationChange,
  getOperators: customOperators,
  maxGroupDepth = 3,
  loading = false,
  onSubmit,
  valueEditor = ValueEditor,
  footer,
  hideControls,
  header,
  enableDragAndDrop = false,
  resetOnFieldChange = true,
  padded = SPACING_6,
  runQueryButtonContent,
  onQueryReset,
  testIds,
}: Props) => {
  const classes = useStyles()

  const [submitButtonClicked, setSubmitButtonClicked] = useState(false)

  const { showError } = useNotifications()

  const { handleQueryChange } = useOnQueryChange({
    maxGroupDepth,
    callback: onQueryChange,
  })

  const { validator, validationErrors, queryBuilderValid } =
    useQueryBuilderValidator({
      fields,
    })

  const resetQuery = useCallback(() => {
    if (onQueryReset) {
      onQueryReset()
    }

    onQueryChange(emptyQueryBuilderQuery)
  }, [onQueryChange, onQueryReset])

  const handleRemoveGroup = useCallback(
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
      showError(
        <ValidationErrors
          validationErrorsTestId={testIds?.validationErrors}
          validationResult={validationErrors}
        />
      )

      return
    }

    if (onSubmit && query) {
      onSubmit(query)
    }
  }, [queryBuilderValid, onSubmit, query, showError, validationErrors])

  const resetSubmitButtonClicked = useCallback(() => {
    setSubmitButtonClicked(false)
  }, [])

  const getDisabledFields = () => {
    return fields
      .filter(field => {
        if (field?.disabled === true) {
          return field.name
        }
      })
      .map(disabledField => disabledField.name)
  }

  const getOperators = useCallback(
    (fieldName: string) => {
      if (customOperators) {
        return customOperators(fields, fieldName)
      }

      return defaultOperators
    },
    [customOperators, fields]
  )

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
        padded={padded}
        direction='column'
        gap='small'
      >
        {header && (
          <Container data-testid={testIds?.header}>{header}</Container>
        )}
        <QueryBuilderDnD dnd={{ ...ReactDnD, ...ReactDndHtml5Backend }}>
          <ReactQueryBuilder
            resetOnFieldChange={resetOnFieldChange}
            fields={fields as QueryBuilderField[]}
            addRuleToNewGroups
            controlClassnames={controlClassnames}
            query={query}
            validator={validator}
            onQueryChange={handleQueryChange}
            showCloneButtons
            getOperators={getOperators}
            context={
              {
                removeGroup: handleRemoveGroup,
                maxDepth: maxGroupDepth,
                queryBuilderValid: queryBuilderValid,
                submitButtonClicked,
                resetSubmitButtonClicked,
                getDisabledFields,
                testIds,
              } as QueryBuilderContext
            }
            controlElements={{
              valueEditor,
            }}
            enableDragAndDrop={enableDragAndDrop}
          />
        </QueryBuilderDnD>
        {!hideControls && (
          <Container
            flex
            justifyContent='flex-end'
            data-testid={testIds?.controls}
          >
            <ClearQueryButton onClick={resetQuery} />
            <RunQueryButton
              onClick={handleSubmit}
              loading={loading}
              children={runQueryButtonContent}
              runQueryTestId={testIds?.runQueryButton}
            />
          </Container>
        )}
        {footer && (
          <Container data-testid={testIds?.footer}>{footer}</Container>
        )}
      </Container>
    </ControlElementsContext>
  )
}

export default QueryBuilder
