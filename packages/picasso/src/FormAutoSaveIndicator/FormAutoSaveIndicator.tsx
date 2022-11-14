import React, { useEffect, useState } from 'react'
import debounce from 'debounce'
import { makeStyles, Theme } from '@material-ui/core/styles'
import cx from 'classnames'

import styles from './styles'
import Typography from '../Typography'
import Container from '../Container'

export interface Props {
  /** Indicates that form values are being saved */
  saving?: boolean
  /** Duration for the delay before hiding 'Saved' text */
  duration?: number
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
  duration = 1000,
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
    }, duration)

    if (savingState === SavingState.Saved) {
      hideIndicator()
    }

    return () => {
      hideIndicator.clear()
    }
  }, [savingState, duration])

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
