import React, { useState } from 'react'
import { Button } from '@toptal/picasso'
import { Autocomplete } from '@toptal/picasso/lab'
import { useNotifications } from '@toptal/picasso/utils'
import { useModals } from '@toptal/picasso/lab/utils'

const allOptions = [
  { text: 'Belarus', value: 'BY' },
  { text: 'Croatia', value: 'HR' },
  { text: 'Lithuania', value: 'LU' },
  { text: 'Slovakia', value: 'SK' },
  { text: 'Ukraine', value: 'UA' }
]

const EMPTY_INPUT_VALUE = ''
const getDisplayValue = (item: any) => (item ? item.text : EMPTY_INPUT_VALUE)
const isSubstring = (subStr: string, str: string) =>
  str.toLowerCase().includes(subStr.trim().toLowerCase())
const filterOptions = (str: string) =>
  str !== ''
    ? allOptions.filter(option => isSubstring(str, getDisplayValue(option)))
    : allOptions

const PromptModalDefaultExample = () => {
  const { showPrompt } = useModals()
  const { showInfo } = useNotifications()

  const handleClick = async () => {
    const { result, hide } = await showPrompt('Country', 'Select country:', {
      // eslint-disable-next-line react/display-name
      children: ({ setResult }) => {
        const [value, setValue] = useState(EMPTY_INPUT_VALUE)
        const [options, setOptions] = useState(allOptions)

        return (
          <Autocomplete
            value={value}
            width='full'
            getDisplayValue={getDisplayValue}
            placeholder='Start typing country...'
            options={options}
            onChange={value => {
              setOptions(filterOptions(value))
              setValue(value)
            }}
            onSelect={item => setResult(item.value)}
          />
        )
      },
      // for purpose of code example
      container: () => document.getElementById('modal-container')!
    })

    showInfo(String(result))
    hide()
  }

  return (
    <React.Fragment>
      <div id='modal-container' style={{ width: '400px', height: '50px' }}>
        <Button onClick={handleClick}>Open prompt</Button>
      </div>
    </React.Fragment>
  )
}

export default PromptModalDefaultExample
