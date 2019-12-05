import React, { useState, Fragment } from 'react'
import { Select, Button } from '@toptal/picasso'

const SelectCustomOptionExample = () => {
  const [value, setValue] = useState()
  const [show, setShow] = useState(false)

  const handleChange = event => {
    setValue(event.target.value)
  }

  const handleShowClick = () => {
    setShow(!show)
  }

  return (
    <Fragment>
      <Button onClick={handleShowClick}>{show ? 'Hide' : 'Show'}</Button>
      {show && (
        <Select
          onChange={handleChange}
          options={OPTIONS}
          autoFocus
          renderOption={option => (
            <div>
              Custom <b>{option.text}</b>
            </div>
          )}
          value={value}
          placeholder='Choose an option...'
          width='auto'
        />
      )}
    </Fragment>
  )
}

const OPTIONS = [
  { value: 1, text: 'option 1' },
  {
    value: 2,
    text: 'option 2'
  }
]

export default SelectCustomOptionExample
