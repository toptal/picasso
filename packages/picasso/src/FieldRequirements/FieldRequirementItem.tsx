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

interface Props
  extends PropsWithChildren<{
    'data-testid'?: string
  }> {
  valid: boolean
  error?: boolean
}
const FieldRequirementItem = ({
  children,
  valid,
  error,
  'data-testid': dataTestId
}: Props) => {
  const classes = useStyles()

  return (
    <Grid.Item
      small={6}
      className={classes.fieldRequirementItem}
      data-testid={dataTestId}
    >
      {valid ? (
        <CheckMinor16
          color='inherit'
          data-testid={`${dataTestId}-valid-icon`}
        />
      ) : error ? (
        <CloseMinor16 color='red' data-testid={`${dataTestId}-error-icon`} />
      ) : (
        <Bullet16
          color='dark-grey'
          data-testid={`${dataTestId}-default-icon`}
        />
      )}
      <Typography
        color={valid ? 'inherit' : error ? 'red' : 'dark-grey'}
        className={classes.fieldRequirementItemMessage}
        size='xxsmall'
      >
        {children}
      </Typography>
    </Grid.Item>
  )
}

export default FieldRequirementItem
