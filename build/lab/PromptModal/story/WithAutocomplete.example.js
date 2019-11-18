import React, { useState } from 'react'
import { Button, Autocomplete } from '@toptal/picasso'
import { useNotifications, isSubstring } from '@toptal/picasso/utils'
import { useModals } from '@toptal/picasso/lab/utils'
const allOptions = [
  { text: 'Belarus', value: 'BY' },
  { text: 'Croatia', value: 'HR' },
  { text: 'Lithuania', value: 'LU' },
  { text: 'Slovakia', value: 'SK' },
  { text: 'Ukraine', value: 'UA' }
]
const EMPTY_INPUT_VALUE = ''
const getDisplayValue = item => (item ? item.text : EMPTY_INPUT_VALUE)
const filterOptions = str =>
  str !== ''
    ? allOptions.filter(option => isSubstring(str, getDisplayValue(option)))
    : allOptions
const PromptModalDefaultExample = () => {
  const { showPrompt } = useModals()
  const { showInfo } = useNotifications()
  const handleClick = () =>
    showPrompt({
      title: 'Country',
      message: 'Select country:',
      // eslint-disable-next-line react/display-name
      content: ({ setResult }) => {
        const [value, setValue] = useState(EMPTY_INPUT_VALUE)
        const [options, setOptions] = useState(allOptions)
        return React.createElement(Autocomplete, {
          value: value,
          width: 'full',
          getDisplayValue: getDisplayValue,
          placeholder: 'Start typing country...',
          options: options,
          onChange: newValue => {
            setOptions(filterOptions(newValue))
            setValue(newValue)
          },
          onSelect: item => setResult(item.value)
        })
      },
      onSubmit: result => showInfo(String(result)),
      // for purpose of code example
      container: () => document.getElementById('modal-container')
    })
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      'div',
      { id: 'modal-container', style: { width: '400px', height: '50px' } },
      React.createElement(Button, { onClick: handleClick }, 'Open prompt')
    )
  )
}
export default PromptModalDefaultExample
//# sourceMappingURL=WithAutocomplete.example.js.map
