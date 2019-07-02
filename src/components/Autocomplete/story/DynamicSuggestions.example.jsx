import React, { useState, useCallback } from 'react'
import { Autocomplete } from '@toptal/picasso'

const remoteSuggestions = [
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

const loadSuggestions = inputValue => {
  return new Promise(resolve => {
    const filteredSuggestions = remoteSuggestions.filter(s =>
      s.label.toLowerCase().includes(inputValue)
    )
    setTimeout(() => resolve(filteredSuggestions), 1000)
  })
}

const AutocompleteDynamicSuggestionsExample = () => {
  const [suggestions, setSuggestions] = useState([])
  const [loading, setLoading] = useState(false)

  const handleChange = useCallback(async value => {
    const inputValue = value.trim().toLowerCase()
    setLoading(true)
    const suggestions = await loadSuggestions(inputValue)
    setLoading(false)
    setSuggestions(suggestions)
  }, [])

  return (
    <div>
      <Autocomplete
        onChange={handleChange}
        suggestions={suggestions}
        loading={loading}
        placeholder='Start typing Sweden...'
      />
    </div>
  )
}

export default AutocompleteDynamicSuggestionsExample
