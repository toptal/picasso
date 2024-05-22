import type { PropsWithChildren } from 'react'
import React from 'react'
import { Typography } from '@toptal/picasso-typography'
import { Bullet16, CheckMinor16, CloseMinor16 } from '@toptal/picasso-icons'
import { GridCompound as Grid } from '@toptal/picasso-grid'

export type FieldRequirementItemStatus = 'default' | 'success' | 'error'
type ColorType = 'dark-grey' | 'inherit' | 'red'

const colorMap: Record<FieldRequirementItemStatus, ColorType> = {
  default: 'dark-grey',
  success: 'inherit',
  error: 'red',
}

const IconsMap = {
  default: Bullet16,
  success: CheckMinor16,
  error: CloseMinor16,
}

interface Props extends PropsWithChildren<{}> {
  status: FieldRequirementItemStatus
  testIds?: {
    root?: string
    successIcon?: string
    errorIcon?: string
    defaultIcon?: string
  }
}
const FieldRequirementItem = ({ children, status, testIds }: Props) => {
  const IconComponent = IconsMap[status]
  const iconTestId = getIconTestId(status, testIds)

  return (
    <Grid.Item
      xs={6}
      className='flex items-center text-gray-600'
      data-testid={testIds?.root}
    >
      <IconComponent color={colorMap[status]} data-testid={iconTestId} />
      <Typography color={colorMap[status]} className='!ml-[8px]' size='xxsmall'>
        {children}
      </Typography>
    </Grid.Item>
  )
}

export default FieldRequirementItem

const getIconTestId = (
  status: FieldRequirementItemStatus,
  testIds?: {
    root?: string
    successIcon?: string
    errorIcon?: string
    defaultIcon?: string
  }
) => {
  if (status === 'error') {
    return testIds?.errorIcon
  }
  if (status === 'success') {
    return testIds?.successIcon
  }

  return testIds?.defaultIcon
}
