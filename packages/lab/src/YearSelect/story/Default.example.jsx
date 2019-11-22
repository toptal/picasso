import React, { useState } from 'react'
import { YearSelect } from '@toptal/picasso-lab'

const DefaultExample = () => {
  const [year, setYear] = useState()

  const onChange = event => {
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

export default DefaultExample
