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

  return (
    <Grid.Item
      small={6}
      className={classes.fieldRequirementItem}
      data-testid={dataTestId}
    >
      {status === 'success' ? (
        <CheckMinor16
          color={colorMap[status]}
          data-testid={`${dataTestId}-valid-icon`}
        />
      ) : status === 'error' ? (
        <CloseMinor16
          color={colorMap[status]}
          data-testid={`${dataTestId}-error-icon`}
        />
      ) : (
        <Bullet16
          color={colorMap[status]}
          data-testid={`${dataTestId}-default-icon`}
        />
      )}
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
