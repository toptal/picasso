import React from 'react'
import { Container } from '@toptal/picasso-container'
import { Typography } from '@toptal/picasso-typography'
import { RadioGroup as PicassoRadioGroup } from '@toptal/picasso-radio'
import type { CombinatorSelectorProps } from 'react-querybuilder'
import { makeStyles } from '@material-ui/core/styles'
import cx from 'classnames'

import { RadioOptions } from './RadioOptions'
import styles from './styles'

const useStyles = makeStyles(styles)

export const CombinatorSelector = ({
  value,
  handleOnChange,
  options,
  disabled,
  className,
  level,
}: Omit<CombinatorSelectorProps, 'schema'>) => {
  const classes = useStyles()

  return (
    <Container
      flex
      alignItems='center'
      gap='small'
      className={cx(className, classes.root)}
    >
      {level === 0 && <Typography weight='semibold'>Query</Typography>}
      <PicassoRadioGroup
        name='variableName'
        horizontal
        onChange={event => handleOnChange(event.target.value)}
        value={value}
      >
        {RadioOptions({ options, disabled })}
      </PicassoRadioGroup>
    </Container>
  )
}
