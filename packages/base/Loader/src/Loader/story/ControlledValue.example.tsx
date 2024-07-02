import React, { useState } from 'react'
import { Loader } from '@toptal/picasso'

const Example = () => {
  const [value, setValue] = useState(50)

  return (
    <div className='flex flex-col items-center gap-8'>
      <Loader value={value}>{`${value}%`}</Loader>
      <input
        type='range'
        min='0'
        max='100'
        value={value}
        onChange={event => setValue(event.target.valueAsNumber)}
        step='10'
      />
    </div>
  )
}

export default Example
