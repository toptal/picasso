import React, { useEffect, useState } from 'react'
import debounce from 'debounce'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import cx from 'classnames'
import { Typography } from '@toptal/picasso-typography'
import { Container } from '@toptal/picasso-container'

import styles from './styles'

export interface Props {
  /** Indicates that form values are being saved */
  saving?: boolean
  /** Timeout duration for the delay before hiding 'Saved' text */
  hideTimeout?: number
  /** The text of the label, default is 'Saved' */
  label?: string
}

enum SavingState {
  Initial,
  Saving,
  Saved,
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoAutoSaveIndicator',
})

const FormAutoSaveIndicator = ({
  saving,
  label = 'Saved',
  hideTimeout = 1000,
}: Props) => {
  const [savingState, setSavingState] = useState<SavingState>(
    SavingState.Initial
  )
  const classes = useStyles()

  useEffect(() => {
    if (saving) {
      setSavingState(SavingState.Saving)
    } else if (savingState === SavingState.Saving) {
      setSavingState(SavingState.Saved)
    }
  }, [saving, savingState])

  useEffect(() => {
    const hideIndicator = debounce(() => {
      setSavingState(SavingState.Initial)
    }, hideTimeout)

    if (savingState === SavingState.Saved) {
      hideIndicator()
    }

    return () => {
      hideIndicator.clear()
    }
  }, [savingState, hideTimeout])

  return (
    <Container
      className={cx(classes.root, {
        [classes.visible]: savingState === SavingState.Saved,
      })}
      align='right'
    >
      <Typography size='xxsmall'>{label}</Typography>
    </Container>
  )
}

export default FormAutoSaveIndicator
