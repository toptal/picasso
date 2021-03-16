import React, { useState } from 'react'
import { Button, Autocomplete, PromptModal } from '@toptal/picasso'
import { Item } from '@toptal/picasso/Autocomplete'
import { useNotifications, isSubstring, useModal } from '@toptal/picasso/utils'

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

const PromptModalDefaultExample = () => {
  const { showModal, hideModal, isOpen } = useModal()
  const { showInfo } = useNotifications()

  return (
    <>
      <Button onClick={showModal}>Open prompt</Button>
      <PromptModal
        open={isOpen}
        onClose={hideModal}
        title='Country'
        message='Select country:'
        onSubmit={result => showInfo(String(result))}
      >
        {Content}
      </PromptModal>
    </>
  )
}

export default PromptModalDefaultExample
