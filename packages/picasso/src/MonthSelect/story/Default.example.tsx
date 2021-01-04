import React, { useState } from 'react'
import { MonthSelect } from '@toptal/picasso'

const Example = () => {
  const [selectedOption, setSelectedOption] = useState<number | undefined>()

  const onChange = (e: React.ChangeEvent<{ value: number | undefined }>) => {
    setSelectedOption(e.target.value)
  }

  return (
    <MonthSelect
      width='auto'
      placeholder='Select month'
      onChange={onChange}
      value={selectedOption}
    />
  )
}

export default Example
