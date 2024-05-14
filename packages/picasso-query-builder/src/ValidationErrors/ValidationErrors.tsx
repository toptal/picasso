import React, { Fragment, useMemo } from 'react'
import { Container } from '@toptal/picasso-container'
import { List } from '@toptal/picasso-list'
import { Typography } from '@toptal/picasso-typography'
import type { ValidationResult } from 'react-querybuilder'

const ValidationErrors = ({
  validationResult,
  validationErrorsTestId: testId,
}: {
  validationResult: Record<string, ValidationResult | boolean>
  validationErrorsTestId?: string
}) => {
  const validationErrors = useMemo(
    () =>
      Object.keys(validationResult)
        .map(rule => ({
          rule,
          validation: validationResult[rule],
        }))
        .filter(
          result =>
            typeof result.validation === 'object' && !result.validation.valid
        ),
    [validationResult]
  )

  if (!validationErrors.length) {
    return null
  }

  return (
    <Container data-testid={testId} flex direction='column' gap='small'>
      <Typography>
        Please fix validation errors before running the query
      </Typography>
      <List variant='unordered'>
        {validationErrors.map(({ rule, validation }) => {
          const reasons = (validation as ValidationResult)?.reasons?.filter(
            reasonOrUndefined => reasonOrUndefined !== undefined
          )

          return (
            <Fragment key={rule}>
              {reasons?.map((reason, index) => (
                <List.Item
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  data-testid={testId && `${testId}-${index}`}
                >
                  {reason.message ?? reason}
                </List.Item>
              ))}
            </Fragment>
          )
        })}
      </List>
    </Container>
  )
}

export default ValidationErrors
