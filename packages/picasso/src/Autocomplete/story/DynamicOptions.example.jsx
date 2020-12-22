import React, { useState, useCallback } from 'react'
import debounce from 'debounce'
import { Autocomplete } from '@toptal/picasso'
import { isSubstring } from '@toptal/picasso/utils'

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
      isSubstring(inputValue, text)
    )

    const result = filteredOptions.length ? filteredOptions : null

    setTimeout(() => resolve(result), 1000)
  })

const Example = () => {
  const [value, setValue] = useState('')
  const [options, setOptions] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChangeDebounced = useCallback(
    debounce(async inputValue => {
      const newOptions = await loadOptions(inputValue.trim().toLowerCase())

      setLoading(false)
      setOptions(newOptions)
    }, 500),
    []
  )

  const handleChange = (inputValue, options) => {
    setValue(inputValue)

    if (options.isSelected) {
      return
    }

    if (inputValue.length >= MIN_CHARS) {
      setLoading(true)
      handleChangeDebounced(inputValue)
    } else {
      setLoading(false)
      setOptions(null)
      handleChangeDebounced.clear()
    }
  }

  return (
    <div>
      <Autocomplete
        value={value}
        onChange={handleChange}
        options={options}
        loading={loading}
        placeholder='Start typing Mongolia...'
        data-testid='autocomplete'
      />
    </div>
  )
}

export default Example
