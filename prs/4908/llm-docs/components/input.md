# Input

Input fields are UI elements through which users submit information to the system.
    Input fields should be clearly labeled by the topic to ensure users know exactly what is being asked of them.

### Default

```tsx
import React, { useState } from 'react'
import { Input } from '@toptal/picasso'

const Example = () => {
  const [value, setValue] = useState('Text')

  const handleChange = (event: React.ChangeEvent<{ value: string }>) => {
    setValue(event.target.value)
  }

  return (
    <Input
      value={value}
      placeholder='Placeholder'
      onChange={handleChange}
      data-testid='input'
    />
  )
}

export default Example
```

### Disabled

```tsx
import React, { useState } from 'react'
import { Input, Container } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'

const Example = () => {
  const [value, setValue] = useState('Text')

  const handleChange = (event: React.ChangeEvent<{ value: string }>) => {
    setValue(event.target.value)
  }

  return (
    <Container flex inline>
      <Container right={SPACING_4}>
        <Input disabled value={value} onChange={handleChange} />
      </Container>
      <Input disabled placeholder='Placeholder' />
    </Container>
  )
}

export default Example
```

### Status

```tsx
import React from 'react'
import { Input, Form } from '@toptal/picasso'

const Example = () => {
  return (
    <Form>
      <Form.Field>
        <Form.Label>Default</Form.Label>
        <Input value='Ukraine' status='default' />
      </Form.Field>
      <Form.Field>
        <Form.Label>Error</Form.Label>
        <Input value='Ukraine' status='error' />
      </Form.Field>
      <Form.Field>
        <Form.Label>Warning</Form.Label>
        <Input value='Ukraine' status='warning' />
      </Form.Field>
      <Form.Field>
        <Form.Label>Success</Form.Label>
        <Input value='Ukraine' status='success' />
      </Form.Field>
      <Form.Field>
        <Form.Label>Multiline Success</Form.Label>
        <Input value='Ukraine' multiline rows={4} status='success' />
      </Form.Field>
      <Form.Field>
        <Form.Label>Multiline Success With Counter</Form.Label>
        <Input
          value='Ukraine'
          multiline
          rows={4}
          status='success'
          counter='entered'
        />
      </Form.Field>
    </Form>
  )
}

export default Example
```

### Multiline status horizontal

```tsx
import React from 'react'
import { Input, Form } from '@toptal/picasso'

const Example = () => {
  return (
    <Form layout='horizontal'>
      <Form.Field>
        <Form.Label>Multiline Success</Form.Label>
        <Input value='Ukraine' multiline rows={4} status='success' />
      </Form.Field>
      <Form.Field>
        <Form.Label>Multiline Success With Counter</Form.Label>
        <Input
          value='Ukraine'
          multiline
          rows={4}
          status='success'
          counter='entered'
        />
      </Form.Field>
    </Form>
  )
}

export default Example
```

### With icon

```tsx
import React, { useState } from 'react'
import { Input, Container } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'
import { Search16 } from '@toptal/picasso-icons'

const Example = () => {
  const [value, setValue] = useState('Text')

  const handleChange = (event: React.ChangeEvent<{ value: string }>) => {
    setValue(event.target.value)
  }

  return (
    <Container flex direction='column'>
      <Container bottom={SPACING_4}>
        <Input icon={<Search16 />} value={value} onChange={handleChange} />
      </Container>
      <Container bottom={SPACING_4}>
        <Input
          disabled
          icon={<Search16 />}
          value={value}
          onChange={handleChange}
        />
      </Container>
      <Container bottom={SPACING_4}>
        <Input
          iconPosition='end'
          icon={<Search16 />}
          value={value}
          onChange={handleChange}
        />
      </Container>
      <Container bottom={SPACING_4}>
        <Input
          iconPosition='end'
          icon={<Search16 />}
          placeholder='Placeholder'
          onChange={handleChange}
        />
      </Container>
    </Container>
  )
}

export default Example
```

### Sizes

```tsx
import React, { useState } from 'react'
import { Input, Container, Typography } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'

const Example = () => {
  const [value, setValue] = useState<string>('')

  const handleChange = (event: React.ChangeEvent<{ value: string }>) => {
    setValue(event.target.value)
  }

  return (
    <Container flex direction='column'>
      <Container padded={SPACING_4}>
        <Typography variant='heading' size='small'>
          Small
        </Typography>
        <Container top={SPACING_4} bottom={SPACING_4}>
          <Input
            size='small'
            value={value}
            placeholder='Small'
            onChange={handleChange}
          />
        </Container>
      </Container>
      <Container padded={SPACING_4}>
        <Typography variant='heading' size='small'>
          Medium (default)
        </Typography>
        <Container top={SPACING_4} bottom={SPACING_4}>
          <Input
            size='medium'
            value={value}
            placeholder='Medium (default)'
            onChange={handleChange}
          />
        </Container>
      </Container>
      <Container padded={SPACING_4}>
        <Typography variant='heading' size='small'>
          Large
        </Typography>
        <Container top={SPACING_4} bottom={SPACING_4}>
          <Input
            size='large'
            value={value}
            placeholder='Large'
            onChange={handleChange}
          />
        </Container>
      </Container>
    </Container>
  )
}

export default Example
```

### Full width

```tsx
import React, { useState } from 'react'
import { Input } from '@toptal/picasso'

const Example = () => {
  const [value, setValue] = useState('Text')

  const handleChange = (event: React.ChangeEvent<{ value: string }>) => {
    setValue(event.target.value)
  }

  return (
    <Input
      width='full'
      value={value}
      placeholder='Placeholder'
      onChange={handleChange}
    />
  )
}

export default Example
```

### Multiline | Textarea

```tsx
import React, { useState } from 'react'
import { Input, Container } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'

const Example = () => {
  const [value, setValue] = useState('Multiline text')

  const handleChange = (event: React.ChangeEvent<{ value: string }>) => {
    setValue(event.target.value)
  }

  return (
    <Container flex inline>
      <Container right={SPACING_4}>
        <Input multiline rows={4} value={value} onChange={handleChange} />
      </Container>
      <Container right={SPACING_4}>
        <Input multiline rows={4} placeholder='Placeholder' />
      </Container>
    </Container>
  )
}

export default Example
```

### Multiline expand and resize | Textarea

```tsx
import React from 'react'
import { Input, Container, Typography } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'

const Example = () => {
  return (
    <Container flex direction='column'>
      <Container padded={SPACING_4}>
        <Typography variant='heading' size='small'>
          With auto-expand (up to 5 rows)
        </Typography>
        <Container right={SPACING_4}>
          <Input
            multiline
            rows={2}
            rowsMax={5}
            placeholder='With auto-expand...'
          />
        </Container>
      </Container>
      <Container padded={SPACING_4}>
        <Typography variant='heading' size='small'>
          With auto-expand (up to 5 rows) and manual resize (not limited)
        </Typography>
        <Container right={SPACING_4}>
          <Input
            multiline
            multilineResizable
            rows={2}
            rowsMax={5}
            placeholder='With auto-expand and manual resize...'
          />
        </Container>
      </Container>
    </Container>
  )
}

export default Example
```

### AutoComplete defined as email

```tsx
import React, { useState } from 'react'
import { Input } from '@toptal/picasso'

const Example = () => {
  const [value, setValue] = useState('')

  const handleChange = (event: React.ChangeEvent<{ value: string }>) => {
    setValue(event.target.value)
  }

  return (
    <Input
      value={value}
      type='email'
      name='email'
      autoComplete='email'
      placeholder='email'
      onChange={handleChange}
    />
  )
}

export default Example
```

### With Limit

```tsx
import React, { useState } from 'react'
import { Input, Container, Typography } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'

type ChangeHandler = (event: React.ChangeEvent<{ value: string }>) => void

const useInputValue = (defaultValue: string): [string, ChangeHandler] => {
  const [value, setValue] = useState(defaultValue)

  const handleChange: ChangeHandler = event => {
    setValue(event.target.value)
  }

  return [value, handleChange]
}

const InputWithLimitExample = () => {
  const [inputRemainingValue, handleInputRemainingChange] =
    useInputValue('Polonius, Hamlet')
  const [textAreaRemainingValue, handleTextareaRemainingChange] = useInputValue(
    'Brevity is the soul of wit...'
  )
  const [inputEnteredValue, handleInputEnteredChange] =
    useInputValue('Bruce Wayne')
  const [textAreaEnteredValue, handleTextareaEnteredChange] = useInputValue(
    "It's not who I am underneath, but what I do that defines me."
  )

  return (
    <Container flex direction='column'>
      <Container padded={SPACING_4}>
        <Typography variant='heading' size='small'>
          Remaining chars counter:
        </Typography>
        <Container top={SPACING_4} bottom={SPACING_4}>
          <Input
            limit={10}
            value={inputRemainingValue}
            onChange={handleInputRemainingChange}
          />
        </Container>

        <Container>
          <Input
            limit={10}
            multiline
            rows={4}
            value={textAreaRemainingValue}
            onChange={handleTextareaRemainingChange}
          />
        </Container>
      </Container>

      <Container padded={SPACING_4}>
        <Typography variant='heading' size='small'>
          Entered chars counter:
        </Typography>
        <Container top={SPACING_4} bottom={SPACING_4}>
          <Input
            counter='entered'
            value={inputEnteredValue}
            onChange={handleInputEnteredChange}
          />
        </Container>

        <Container>
          <Input
            counter='entered'
            multiline
            rows={4}
            value={textAreaEnteredValue}
            onChange={handleTextareaEnteredChange}
          />
        </Container>
      </Container>
    </Container>
  )
}

export default InputWithLimitExample
```

### With reset button

```tsx
import React, { useState } from 'react'
import { Input } from '@toptal/picasso'

const ResetButtonExample = () => {
  const [value, setValue] = useState('Text')

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setValue(event.target.value)
  }

  const handleResetClick = () => {
    setValue('')
  }

  return (
    <Input
      enableReset
      onResetClick={handleResetClick}
      value={value}
      placeholder='Placeholder'
      onChange={handleChange}
    />
  )
}

export default ResetButtonExample
```

### Refs

```tsx
import React from 'react'
import { Input, Container, Tooltip } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'

import type { Props } from '../Input'

const InputWrapper = React.forwardRef<HTMLInputElement, Props>((props, ref) => (
  <Input {...props} outlineRef={ref} />
))

const RefsExample = () => {
  return (
    <Container flex direction='column'>
      <Container padded={SPACING_4}>
        <Tooltip content='Tooltip has Input as a children' placement='right'>
          <Input placeholder='ref demo' />
        </Tooltip>
      </Container>
      <Container padded={SPACING_4}>
        <Tooltip
          content='Tooltip has InputWrapper as a children. The InputWrapper passes ref to outlineRef of the Input.'
          placement='right'
        >
          <InputWrapper placeholder='outlineRef demo' />
        </Tooltip>
      </Container>
    </Container>
  )
}

export default RefsExample
```
