import React, { useState } from 'react'
import { Input } from '@toptal/picasso'

const ResetButtonVisibilityExample = () => {
  const [value, setValue] = useState('Text')

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setValue(event.target.value)
  }

  const handleResetClick = () => {
    setValue('')
  }

  return (
    <Input
      enableReset
      resetVisibility='always'
      onResetClick={handleResetClick}
      value={value}
      placeholder='Placeholder'
      onChange={handleChange}
    />
  )
}

export default ResetButtonVisibilityExample
