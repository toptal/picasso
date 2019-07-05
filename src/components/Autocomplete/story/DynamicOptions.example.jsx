import React, { useState, useCallback } from 'react'
import { Autocomplete } from '@toptal/picasso'

const remoteOptions = [
  { label: 'Belarus' },
  { label: 'Croatia' },
  { label: 'Lithuania' },
  { label: 'Slovakia' },
  { label: 'Ukraine' },
  { label: 'Spain' },
  { label: 'Sweden' },
  { label: 'Switzerland' },
  { label: 'Norway' },
  { label: 'Finland' }
]

const loadOptions = inputValue => {
  return new Promise(resolve => {
    const filteredOptions = remoteOptions.filter(({ label }) =>
      label.toLowerCase().includes(inputValue)
    )

    setTimeout(() => resolve(filteredOptions), 1000)
  })
}

const AutocompleteDynamicOptionsExample = () => {
  const [options, setOptions] = useState([])
  const [loading, setLoading] = useState(false)

  const handleChange = useCallback(async e => {
    const inputValue = e.target.value.trim().toLowerCase()

    setLoading(true)
    const options = await loadOptions(inputValue)

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
