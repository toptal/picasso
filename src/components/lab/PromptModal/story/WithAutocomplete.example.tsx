import React, { useState } from 'react'
import { Button } from '@toptal/picasso'
import { Autocomplete } from '@toptal/picasso/lab'
import { Props as AutocompleteProps } from '@toptal/picasso/lab/Autocomplete'
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
const getDisplayValue: AutocompleteProps['getDisplayValue'] = item =>
  item ? (item.text as string) : EMPTY_INPUT_VALUE
const filterOptions = (str: string) =>
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

        return (
          <Autocomplete
            value={value}
            width='full'
            getDisplayValue={getDisplayValue}
            placeholder='Start typing country...'
            options={options}
            onChange={newValue => {
              setOptions(filterOptions(newValue))
              setValue(newValue)
            }}
            onSelect={item => setResult(item.value)}
          />
        )
      },
      onSubmit: result => showInfo(String(result)),
      // for purpose of code example
      container: () => document.getElementById('modal-container')!
    })

  return (
    <React.Fragment>
      <div id='modal-container' style={{ width: '400px', height: '50px' }}>
        <Button onClick={handleClick}>Open prompt</Button>
      </div>
    </React.Fragment>
  )
}

export default PromptModalDefaultExample
