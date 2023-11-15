import React from 'react'
import { Container, Radio as PicassoRadio, Typography } from '@toptal/picasso'
import type { CombinatorSelectorProps } from 'react-querybuilder'
import { makeStyles } from '@material-ui/core/styles'
import cx from 'classnames'
import { SPACING_4 } from '@toptal/picasso/utils'

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
      gap={SPACING_4}
      className={cx(className, classes.root)}
    >
      {level === 0 && <Typography weight='semibold'>Query</Typography>}
      <PicassoRadio.Group
        name='variableName'
        horizontal
        onChange={event => handleOnChange(event.target.value)}
        value={value}
      >
        {RadioOptions({ options, disabled })}
      </PicassoRadio.Group>
    </Container>
  )
}
