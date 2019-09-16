import React, { useState, useCallback } from 'react'
import debounce from 'debounce'
import { Autocomplete } from '@toptal/picasso/lab'

const remoteOptions = [
  { text: 'Belarus' },
  { text: 'Croatia' },
  { text: 'Finland' },
  { text: 'Lithuania' },
  { text: 'Micronesia' },
  { text: 'Moldova' },
  { text: 'Monaco' },
  { text: 'Mongolia' },
  { text: 'Norway' },
  { text: 'Slovakia' },
  { text: 'Spain' },
  { text: 'Sweden' },
  { text: 'Switzerland' },
  { text: 'Ukraine' }
]

const MIN_CHARS = 2

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

  const handleChangeDebounced = useCallback(
    debounce(async inputValue => {
      const options = await loadOptions(inputValue.trim().toLowerCase())

      setLoading(false)
      setOptions(options)
    }, 500),
    []
  )

  const handleChange = inputValue => {
    if (inputValue.length >= MIN_CHARS) {
      setLoading(true)
      handleChangeDebounced(inputValue)
    }
  }

  return (
    <div>
      <Autocomplete
        onChange={handleChange}
        options={options}
        loading={loading}
        minLength={MIN_CHARS}
        placeholder='Start typing Mongolia...'
      />
    </div>
  )
}

export default AutocompleteDynamicOptionsExample
