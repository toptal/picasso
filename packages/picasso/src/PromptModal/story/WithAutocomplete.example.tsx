import React, { useState } from 'react'
import { Button, Autocomplete } from '@toptal/picasso'
import { Item } from '@toptal/picasso/Autocomplete'
import { useNotifications, isSubstring, useModals } from '@toptal/picasso/utils'

const allOptions = [
  { text: 'Belarus', value: 'BY' },
  { text: 'Croatia', value: 'HR' },
  { text: 'Lithuania', value: 'LU' },
  { text: 'Slovakia', value: 'SK' },
  { text: 'Ukraine', value: 'UA' }
]

interface ContentProps {
  setResult: (value: unknown) => void
}

const EMPTY_INPUT_VALUE = ''
const getDisplayValue = (item: Item | null) =>
  item ? (item.text as string) : EMPTY_INPUT_VALUE
const filterOptions = (str: string) =>
  str !== ''
    ? allOptions.filter(option => isSubstring(str, getDisplayValue(option)))
    : allOptions

const PromptModalDefaultExample = () => {
  const { showPrompt } = useModals()
  const { showInfo } = useNotifications()

  const Content = ({ setResult }: ContentProps) => {
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
  }

  const handleClick = () =>
    showPrompt({
      title: 'Country',
      message: 'Select country:',
      // eslint-disable-next-line react/display-name
      content: Content,
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
