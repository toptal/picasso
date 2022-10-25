import React, { useEffect } from 'react'
import { Typography } from '@toptal/picasso'
import debounce from 'debounce'

interface Props {
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

  if (!show) {
    return null
  }

  return (
    <Typography size='xsmall' align='right'>
      {saving ? 'Saving...' : 'Saved'}
    </Typography>
  )
}

export default AutosaveIndicator
