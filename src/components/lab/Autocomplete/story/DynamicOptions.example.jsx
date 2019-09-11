import React, { useState, useCallback } from 'react'
import { Autocomplete } from '@toptal/picasso/lab'

const remoteOptions = [
  { text: 'Belarus' },
  { text: 'Croatia' },
  { text: 'Lithuania' },
  { text: 'Slovakia' },
  { text: 'Ukraine' },
  { text: 'Spain' },
  { text: 'Sweden' },
  { text: 'Switzerland' },
  { text: 'Norway' },
  { text: 'Finland' }
]

const loadOptions = inputValue =>
  new Promise(resolve => {
    const filteredOptions = remoteOptions.filter(({ text }) =>
      text.toLowerCase().includes(inputValue)
    )

    setTimeout(() => resolve(filteredOptions), 1000)
  })

const AutocompleteDynamicOptionsExample = () => {
  const [options, setOptions] = useState([])
  const [loading, setLoading] = useState(false)

  const handleChange = useCallback(async inputValue => {
    setLoading(true)
    const options = await loadOptions(inputValue.trim().toLowerCase())

    setLoading(false)
    setOptions(options)
  }, [])

  return (
    <div>
      <Autocomplete
        onChange={handleChange}
        options={options}
        loading={loading}
        minLength={2}
        placeholder='Start typing Sweden...'
      />
    </div>
  )
}

export default AutocompleteDynamicOptionsExample
