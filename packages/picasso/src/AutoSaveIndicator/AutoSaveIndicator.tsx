import React, { useEffect } from 'react'
import debounce from 'debounce'
import { makeStyles, Theme } from '@material-ui/core/styles'
import cx from 'classnames'

import Typography from '../Typography'
import styles from './styles'

export interface Props {
  saving: boolean
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoAutosaveIndicator',
})

const AutoSaveIndicator = ({ saving }: Props) => {
  const [show, setShow] = React.useState(false)
  const classes = useStyles()

  useEffect(() => {
    if (saving) {
      setShow(true)
    } else {
      const callback = debounce(() => setShow(false), 1000)

      callback()

      return () => {
        callback.clear()
      }
    }
  }, [saving])

  return (
    <Typography
      className={cx(classes.root, { [classes.hidden]: !show })}
      size='xsmall'
      align='right'
    >
      {saving ? 'Saving...' : 'Saved'}
    </Typography>
  )
}

export default AutoSaveIndicator
