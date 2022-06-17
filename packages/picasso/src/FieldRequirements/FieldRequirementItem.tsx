import React, { PropsWithChildren } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'

import Typography from '../Typography'
import { GridCompound as Grid } from '../GridCompound'
import styles from './styles'
import { Bullet16, CheckMinor16, CloseMinor16 } from '../Icon'

const useStyles = makeStyles<Theme>(styles, {
  name: 'FieldRequirementItem'
})

export type FieldRequirementItemStatus = 'default' | 'success' | 'error'
type ColorType = 'dark-grey' | 'inherit' | 'red'

const colorMap: Record<FieldRequirementItemStatus, ColorType> = {
  default: 'dark-grey',
  success: 'inherit',
  error: 'red'
}

const IconsMap = {
  default: Bullet16,
  success: CheckMinor16,
  error: CloseMinor16
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
  const classes = useStyles()

  const IconComponent = IconsMap[status]
  const iconTestId = getIconTestId(status, testIds)

  return (
    <Grid.Item
      small={6}
      className={classes.fieldRequirementItem}
      data-testid={testIds?.root}
    >
      <IconComponent color={colorMap[status]} data-testid={iconTestId} />
      <Typography
        color={colorMap[status]}
        className={classes.fieldRequirementItemMessage}
        size='xxsmall'
      >
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
