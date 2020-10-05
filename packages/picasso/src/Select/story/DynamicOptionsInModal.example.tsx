import React, { useState, ChangeEvent, useCallback } from 'react'
import debounce from 'debounce'
import { Modal, Button, Select, SelectOption } from '@toptal/picasso'
import { useModal, isSubstring } from '@toptal/picasso/utils'

const OPTIONS = [
  { value: '1', text: 'Option 1' },
  { value: '2', text: 'Option 2' },
  { value: '3', text: 'Option 3' },
  { value: '4', text: 'Option 4' },
  { value: '5', text: 'Option 5' },
  { value: '6', text: 'Option 6' },
  { value: '7', text: 'Option 7' },
  { value: '8', text: 'Option 8' },
  { value: '9', text: 'Option 9' },
  { value: '10', text: 'Option 10' },
  { value: '11', text: 'Option 11' },
  { value: '12', text: 'Option 12' },
  { value: '13', text: 'Option 13' },
  { value: '14', text: 'Option 14' },
  { value: '24', text: 'Option 24' },
  { value: '34', text: 'Option 34' },
  { value: '44', text: 'Option 44' },
  { value: '54', text: 'Option 54' },
  { value: '64', text: 'Option 64' },
  { value: '74', text: 'Option 74' },
  { value: '84', text: 'Option 84' },
  { value: '94', text: 'Option 94' },
  { value: '104', text: 'Option 104' }
]

const loadOptions = (value: string): Promise<SelectOption[]> =>
  new Promise(resolve => {
    const filteredOptions = value
      ? OPTIONS.filter(({ text }) => isSubstring(value, text))
      : []

    const result = filteredOptions.length ? filteredOptions : []

    setTimeout(() => resolve(result), 1000)
  })

const ModalDialog = ({
  open,
  onClose
}: {
  open: boolean
  onClose: () => void
}) => {
  const [value, setValue] = useState<string | number>()
  const [loading, setLoading] = useState(false)
  const [options, setOptions] = useState<SelectOption[]>([])

  const handleSearchChangeDebounced = useCallback(
    debounce(async (searchValue: string) => {
      const newOptions = await loadOptions(searchValue)

      setLoading(false)
      setOptions(newOptions)
    }, 500),
    []
  )

  const handleSearchChange = (searchValue: string) => {
    setLoading(true)
    setOptions([])
    handleSearchChangeDebounced(searchValue)
  }

  const handleChange = (
    event: ChangeEvent<{
      name?: string | undefined
      value: string | number
    }>
  ) => {
    console.log('Select value:', event.target.value)
    setValue(event.target.value)
    setOptions([])
  }

  return (
    <Modal onClose={onClose} open={open}>
      <Modal.Title>Select With Dynamic Options In Modal</Modal.Title>
      <Modal.Content>
        <Select
          searchThreshold={-1}
          onSearchChange={handleSearchChange}
          loading={loading}
          onChange={handleChange}
          options={options}
          value={value}
          placeholder='Choose an option...'
          width='auto'
        />
      </Modal.Content>
      <Modal.Actions>
        <Button variant='secondary' onClick={onClose}>
          Cancel
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

const Example = () => {
  const { showModal, hideModal, isOpen } = useModal()

  return (
    <div id='modal-container'>
      <Button data-testid='open' onClick={showModal}>
        Open
      </Button>
      <ModalDialog open={isOpen} onClose={hideModal} />
    </div>
  )
}

export default Example
