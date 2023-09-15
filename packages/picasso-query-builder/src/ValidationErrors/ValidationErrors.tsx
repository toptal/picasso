import React, { Fragment } from 'react'
import { Container, List, Typography } from '@toptal/picasso'
import type { ValidationResult } from 'react-querybuilder'

const ValidationErrors = ({
  validationResult,
}: {
  validationResult: Record<string, ValidationResult | boolean>
}) => {
  const validationErrors = Object.keys(validationResult)
    .map(rule => ({
      rule,
      validation: validationResult[rule],
    }))
    .filter(
      result =>
        typeof result.validation === 'object' && !result.validation.valid
    )

  if (!validationErrors.length) {
    return null
  }

  return (
    <Container flex direction='column' gap='small'>
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
