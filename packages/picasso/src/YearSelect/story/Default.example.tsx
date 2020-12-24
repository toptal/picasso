import React, { useState } from 'react'
import { YearSelect } from '@toptal/picasso'

const Example = () => {
  const [year, setYear] = useState<number>()

  const onChange = (event: React.ChangeEvent<{ value: number }>) => {
    setYear(event.target.value)

    window.alert(event.target.value + ' is selected')
  }

  return (
    <YearSelect
      width='auto'
      placeholder='Select year'
      onChange={onChange}
      value={year}
      from={2017}
      to={2019}
    />
  )
}

export default Example
