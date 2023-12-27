/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import { Collapse } from '@material-ui/core'
import type { BaseProps } from '@toptal/picasso-shared'
import Typography from '@toptal/picasso-typography'
import Grid from '@toptal/picasso-grid'

import styles from './styles'
import type { FieldRequirementItemStatus } from './FieldRequirementItem'
import FieldRequirementItem from './FieldRequirementItem'
import type { FieldRequirement } from './types'

export interface Props<TValueType> extends BaseProps {
  /** A string that defines the title of the requirement list */
  description?: string
  /** Value of the related input. It will be used to validate the requirements */
  value?: TValueType
  /** Open/Close the requirements section. Opening it with focus is the default behavior */
  open: boolean
  /** Indicate whether `PasswordInput` is in error state */
  error?: boolean
  /** Duration for the collapse animation */
  timeout?: number
  /** Array of object to specify requirements. They will be executed */
  requirements: FieldRequirement<TValueType>[]
  testIds?: {
    root?: string
    description?: string
    gridContainer?: string
  }
}

const ANIMATION_TIMEOUT = 500

const useStyles = makeStyles<Theme>(styles)

export const FieldRequirements = <TValueType,>({
  value,
  description,
  open,
  error,
  timeout,
  requirements,
  className,
  style,
  testIds,
}: Props<TValueType>) => {
  const classes = useStyles()

  return (
    <Collapse
      style={style}
      className={className}
      in={open}
      timeout={timeout}
      data-testid={testIds?.root}
    >
      {description && (
        <Typography
          data-testid={testIds?.description}
          variant='body'
          size='xxsmall'
          className={classes.description}
        >
          {description}
        </Typography>
      )}
      <Grid
        className={classes.root}
        spacing={0}
        data-testid={testIds?.gridContainer}
      >
        {requirements.map(requirement => {
          let status: FieldRequirementItemStatus = 'default'

          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          if (requirement.validator(value!)) {
            status = 'success'
          } else if (error) {
            status = 'error'
          }

          return (
            <FieldRequirementItem
              key={requirement.message}
              status={status}
              testIds={requirement.testIds}
            >
              {requirement.message}
            </FieldRequirementItem>
          )
        })}
      </Grid>
    </Collapse>
  )
}

FieldRequirements.defaultProps = {
  open: false,
  timeout: ANIMATION_TIMEOUT,
  value: '',
}

FieldRequirements.displayName = 'FieldRequirements'

export default FieldRequirements
