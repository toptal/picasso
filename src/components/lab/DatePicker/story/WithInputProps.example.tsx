import React from 'react'
import { DatePicker } from '@toptal/picasso/lab'
import { Search16 } from '@toptal/picasso'

const WithInputPropsExample = () => {
  return (
    <div style={{ height: '50vh', width: '100%' }}>
      <DatePicker
        icon={<Search16 />}
        iconPosition='end'
        width='full'
        placeholder='Please select date...'
        onSelect={(date: Date | [Date, Date]) => {
          /* eslint-disable-next-line no-console */
          console.log('selected date is: ', date)
        }}
      />
    </div>
  )
}

export default WithInputPropsExample
