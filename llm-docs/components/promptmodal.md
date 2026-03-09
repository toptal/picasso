# PromptModal

Predefined modal for short prompts that asks user for input.

## Props

### PromptModal

| Name | Type | Default | Description |
|------|------|---------|-------------|
| children | `((result: PromptOptions) => ReactNode)` | - | Pass input component to allow you get input value from prompt modal |
| **title** | `string` | - | Title of modal |
| **message** | `string` | - | Prompt message |
| variant | `"primary" \| "negative" \| "positive"` | `positive` | Different Prompt variants used for different intention |
| submitText | `string` | `Submit` | Text on Submit button |
| cancelText | `string` | `Cancel` | Text on Cancel button |
| **onSubmit** | `(result: unknown) => unknown` | - | Callback on Submit onClick event, returns result of input component if defined |
| onCancel | `(() => void)` | - | Callback on Cancel onClick event |
| onClose | `(() => void)` | - | Callback executed when attempting to close modal |
| **open** | `boolean` | - | Whether modal should be displayed |
| size | `"xsmall" \| "small" \| "medium" \| "large" \| "xlarge" \| "full-screen"` | `small` | Width of modal |
| onBackdropClick | `(() => void)` | - | Callback executed when backdrop was clicked |
| disableBackdropClick | `boolean` | - | If `true`, clicking the backdrop will not fire `onClose` or `onBackdropClick` |
| onOpen | `(() => void)` | - | Callback executed when modal is being opened |
| container | `ContainerValue` | - | A node, or a function that returns node. The container will have the portal children appended to it. |
| hideBackdrop | `boolean` | - | If `true`, the backdrop is not rendered |
| align | `"top" \| "centered"` | - | Position of the modal relative to the browser's viewport |
| transitionProps | `TransitionProps` | - | Animation lifecycle callbacks. Backed by [react-transition-group/Transition](https://reactcommunity.org/react-transition-group/transition#Transition-props) |
| paperProps | `HTMLAttributes<HTMLDivElement>` | - | used for specifying aria attributes, changing role, or customizing styles |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |

### Default

```tsx
import React from 'react'
import { Button, PromptModal } from '@toptal/picasso'
import { useModal } from '@toptal/picasso-utils'
import { useNotifications } from '@toptal/picasso-notification'

const timeout = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const PromptModalDefaultExample = () => {
  const { showModal, hideModal, isOpen } = useModal()
  const { showInfo } = useNotifications()

  return (
    <>
      <Button onClick={showModal}>Open prompt</Button>
      <PromptModal
        open={isOpen}
        title='Confirm'
        message='Hello, World!'
        submitText='OK'
        onSubmit={async () => {
          showInfo('Submitting')
          await timeout(2000)
          showInfo('Submitted')
        }}
        onClose={hideModal}
      />
    </>
  )
}

export default PromptModalDefaultExample
```

### Variants

```tsx
import React from 'react'
import { Button, Container, PromptModal } from '@toptal/picasso'
import { useModal } from '@toptal/picasso-utils'
import { useNotifications } from '@toptal/picasso-notification'

const PromptModalDefaultExample = () => {
  const {
    showModal: showModalPositive,
    hideModal: hideModalPositive,
    isOpen: isOpenPositive,
  } = useModal()

  const {
    showModal: showModalNegative,
    hideModal: hideModalNegative,
    isOpen: isOpenNegative,
  } = useModal()

  const {
    showModal: showModalPrimary,
    hideModal: hideModalPrimary,
    isOpen: isOpenPrimary,
  } = useModal()

  const { showInfo } = useNotifications()

  return (
    <>
      <Container flex>
        <Button onClick={showModalPositive}>Open positive</Button>
        <PromptModal
          variant='positive'
          open={isOpenPositive}
          title='Positive variant'
          message='This is positive variant.'
          onSubmit={async () => showInfo('Submitted')}
          onClose={hideModalPositive}
        />

        <Button onClick={showModalNegative}>Open negative</Button>
        <PromptModal
          variant='negative'
          open={isOpenNegative}
          title='Negative variant'
          message='This is negative variant.'
          onSubmit={async () => showInfo('Submitted')}
          onClose={hideModalNegative}
        />

        <Button onClick={showModalPrimary}>Open primary</Button>
        <PromptModal
          variant='primary'
          open={isOpenPrimary}
          title='Primary variant'
          message='This is primary variant.'
          onSubmit={async () => showInfo('Submitted')}
          onClose={hideModalPrimary}
        />
      </Container>
    </>
  )
}

export default PromptModalDefaultExample
```

### With Input

```tsx
import React from 'react'
import { Button, Input, PromptModal } from '@toptal/picasso'
import { useModal } from '@toptal/picasso-utils'
import { useNotifications } from '@toptal/picasso-notification'

const PromptModalDefaultExample = () => {
  const { showModal, hideModal, isOpen } = useModal()
  const { showInfo } = useNotifications()

  return (
    <>
      <Button onClick={showModal}>Open prompt</Button>
      <PromptModal
        open={isOpen}
        onClose={hideModal}
        title='Email'
        message='Enter your email:'
        onSubmit={result => showInfo(String(result))}
      >
        {({ setResult, result }) => (
          <Input
            width='full'
            onChange={event => setResult(event.target.value)}
            value={String(result || '')}
          />
        )}
      </PromptModal>
    </>
  )
}

export default PromptModalDefaultExample
```

### With Autocomplete

```tsx
import React, { useState } from 'react'
import { Button, Autocomplete, PromptModal } from '@toptal/picasso'
import type { Item } from '@toptal/picasso-autocomplete'
import { isSubstring, useModal } from '@toptal/picasso-utils'
import { useNotifications } from '@toptal/picasso-notification'

const allOptions = [
  { text: 'Belarus', value: 'BY' },
  { text: 'Croatia', value: 'HR' },
  { text: 'Lithuania', value: 'LU' },
  { text: 'Slovakia', value: 'SK' },
  { text: 'Ukraine', value: 'UA' },
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
```

### Error handling

```tsx
import React from 'react'
import { Button, Input, PromptModal } from '@toptal/picasso'
import { useModal } from '@toptal/picasso-utils'
import { useNotifications } from '@toptal/picasso-notification'

const PromptModalDefaultExample = () => {
  const { showModal, hideModal, isOpen } = useModal()
  const { showInfo, showError } = useNotifications()

  return (
    <>
      <Button onClick={showModal}>Open prompt</Button>
      <PromptModal
        open={isOpen}
        title='Email'
        message='Enter your email:'
        onSubmit={result => {
          if (!result || result === '') {
            showError('Result cannot be empty')
            throw new Error('Result cannot be empty')
          }

          showInfo(String(result))
        }}
        onClose={hideModal}
      >
        {({ setResult, result, error, setError }) => {
          const handleChange = (
            event: React.ChangeEvent<
              HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
            >
          ) => {
            const { value } = event.target

            if (!value) {
              setError(true)
            } else {
              setError(false)
            }

            setResult(value)
          }

          return (
            <Input
              width='full'
              status={error ? 'error' : 'default'}
              value={String(result || '')}
              onChange={handleChange}
            />
          )
        }}
      </PromptModal>
    </>
  )
}

export default PromptModalDefaultExample
```
