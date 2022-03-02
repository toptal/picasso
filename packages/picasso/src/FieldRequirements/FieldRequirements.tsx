import React, { forwardRef } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { Collapse } from '@material-ui/core'
import { BaseProps } from '@toptal/picasso-shared'

import styles from './styles'
import FieldRequirementItem, {
  FieldRequirementItemStatus
} from './FieldRequirementItem'
import Typography from '../Typography'
import { FieldRequirement } from './types'
import Grid from '../Grid'

export interface Props extends BaseProps {
  /** A string that defines the title of the requirement list */
  description?: string
  /** Value of the related input. It will be used to validate the requirements */
  value: any
  /** Open/Close the requirements section. Opening it with focus is the default behavior */
  open: boolean
  /** Indicate whether `PasswordInput` is in error state */
  error?: boolean
  /** Duration for the collapse animation */
  timeout?: number
  /** Array of object to specify requirements. They will be executed */
  requirements: FieldRequirement[]
  testIds?: {
    root?: string
    description?: string
    gridContainer?: string
  }
}

const useStyles = makeStyles<Theme>(styles)

export const FieldRequirements = forwardRef<HTMLDivElement, Props>(
  function FieldRequirements(
    {
      value,
      description,
      open,
      error,
      timeout,
      requirements,
      className,
      style,
      testIds
    }: Props,
    ref
  ) {
    const classes = useStyles()

    return (
      <Collapse
        ref={ref}
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

            if (requirement.validator(value)) {
              status = 'success'
            } else if (error) {
              status = 'error'
            }

            return (
              <FieldRequirementItem
                key={requirement.message}
                status={status}
                data-testid={requirement['data-testid']}
              >
                {requirement.message}
              </FieldRequirementItem>
            )
          })}
        </Grid>
      </Collapse>
    )
  }
)

FieldRequirements.defaultProps = {
  open: false,
  timeout: 500
}

FieldRequirements.displayName = 'FieldRequirements'

export default FieldRequirements
