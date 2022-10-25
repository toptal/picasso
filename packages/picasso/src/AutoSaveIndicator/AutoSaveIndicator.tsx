import React, { useEffect } from 'react'
import debounce from 'debounce'

import Typography from '../Typography'

export interface Props {
  saving: boolean
}

const AutosaveIndicator = ({ saving }: Props) => {
  const [show, setShow] = React.useState(false)

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
    <Typography size='xsmall' align='right'>
      {show ? (saving ? 'Saving...' : 'Saved') : ''}
    </Typography>
  )
}

export default AutosaveIndicator
