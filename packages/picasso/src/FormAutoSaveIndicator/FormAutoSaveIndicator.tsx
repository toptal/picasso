import React, { useEffect } from 'react'
import debounce from 'debounce'
import { makeStyles, Theme } from '@material-ui/core/styles'
import cx from 'classnames'

import styles from './styles'
import Typography from '../Typography'
import Container from '../Container'

export interface Props {
  saving?: boolean
  duration?: number
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
  const [show, setShow] = React.useState<'initial' | 'saving' | 'saved'>(
    'initial'
  )
  const classes = useStyles()

  useEffect(() => {
    if (saving) {
      setShow('saving')
    } else if (show === 'saving') {
      setShow('saved')
    }
  }, [saving, show])

  useEffect(() => {
    const hideIndicator = debounce(() => {
      setShow('initial')
    }, duration)

    if (show === 'saved') {
      hideIndicator()
    }

    return () => {
      hideIndicator.clear()
    }
  }, [show, duration])

  return (
    <Container
      className={cx(classes.root, {
        [classes.visible]: show === 'saved',
      })}
      align='right'
    >
      <Typography size='xxsmall'>{label}</Typography>
    </Container>
  )
}

export default FormAutoSaveIndicator
