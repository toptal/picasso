import React from 'react'
import type { BaseProps } from '@toptal/picasso-shared'
import { Typography } from '@toptal/picasso-typography'
import { Grid } from '@toptal/picasso-grid'
import { Collapse } from '@toptal/picasso-collapse'

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

export const FieldRequirements = <TValueType,>({
  value = '' as unknown as TValueType,
  description,
  open = false,
  error,
  timeout = ANIMATION_TIMEOUT,
  requirements,
  className,
  style,
  testIds,
}: Props<TValueType>) => {
  return (
    <Collapse
      style={style}
      className={className}
      in={open}
      timeout={timeout}
      data-testid={testIds?.root}
    >
      <>
        {description && (
          <Typography
            data-testid={testIds?.description}
            variant='body'
            size='xxsmall'
            className='mt-[0.4rem]'
          >
            {description}
          </Typography>
        )}
        <Grid
          className='w-input'
          spacing={0}
          data-testid={testIds?.gridContainer}
        >
          {requirements.map(requirement => {
            let status: FieldRequirementItemStatus = 'default'

            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            if (requirement.validator(value)) {
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
      </>
    </Collapse>
  )
}

FieldRequirements.displayName = 'FieldRequirements'

export default FieldRequirements
