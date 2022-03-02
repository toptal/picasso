import React, { PropsWithChildren } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'

import Bullet16 from '../Icon/Bullet16'
import Typography from '../Typography'
import Grid from '../Grid'
import styles from './styles'
import { CheckMinor16, CloseMinor16 } from '../Icon'

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

interface Props
  extends PropsWithChildren<{
    'data-testid'?: string
  }> {
  status: FieldRequirementItemStatus
}
const FieldRequirementItem = ({
  children,
  status,
  'data-testid': dataTestId
}: Props) => {
  const classes = useStyles()

  const IconComponent = IconsMap[status]

  return (
    <Grid.Item
      small={6}
      className={classes.fieldRequirementItem}
      data-testid={dataTestId}
    >
      <IconComponent
        color={colorMap[status]}
        data-testid={`${dataTestId}-${status}-icon`}
      />
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
