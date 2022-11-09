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

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoAutoSaveIndicator',
})

const FormAutoSaveIndicator = ({
  saving,
  label = 'Saved',
  duration = 1000,
}: Props) => {
  const [savingState, setSavingState] = useState<
    'initial' | 'saving' | 'saved'
  >('initial')
  const classes = useStyles()

  useEffect(() => {
    if (saving) {
      setSavingState('saving')
    } else if (savingState === 'saving') {
      setSavingState('saved')
    }
  }, [saving, savingState])

  useEffect(() => {
    const hideIndicator = debounce(() => {
      setSavingState('initial')
    }, duration)

    if (savingState === 'saved') {
      hideIndicator()
    }

    return () => {
      hideIndicator.clear()
    }
  }, [savingState, duration])

  return (
    <Container
      className={cx(classes.root, {
        [classes.visible]: savingState === 'saved',
      })}
      align='right'
    >
      <Typography size='xxsmall'>{label}</Typography>
    </Container>
  )
}

export default FormAutoSaveIndicator
