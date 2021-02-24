import React, { useState } from 'react'
import { DatePicker } from '@toptal/picasso-lab'
import { Search16 } from '@toptal/picasso'

const WithInputPropsExample = () => {
  const [value, setValue] = useState<Date>()

  return (
    <div style={{ height: '50vh', width: '100%' }}>
      <DatePicker
        value={value}
        icon={<Search16 />}
        iconPosition='end'
        width='full'
        placeholder='Please select date...'
        onChange={date => {
          setValue(date as Date)
        }}
      />
    </div>
  )
}

export default WithInputPropsExample
