import React, { Fragment, useMemo } from 'react'
import { Container, List, Typography } from '@toptal/picasso'
import type { ValidationResult } from 'react-querybuilder'
import { SPACING_4 } from '@toptal/picasso/utils'

const ValidationErrors = ({
  validationResult,
}: {
  validationResult: Record<string, ValidationResult | boolean>
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
    <Container flex direction='column' gap={SPACING_4}>
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
                // eslint-disable-next-line react/no-array-index-key
                <List.Item key={index}>{reason.message ?? reason}</List.Item>
              ))}
            </Fragment>
          )
        })}
      </List>
    </Container>
  )
}

export default ValidationErrors
