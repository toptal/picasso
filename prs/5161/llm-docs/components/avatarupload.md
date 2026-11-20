# AvatarUpload

Gets the image from file input and displays it in the Avatar component.

## Props

### AvatarUpload

| Name | Type | Default | Description |
|------|------|---------|-------------|
| accept | `{ [key: string]: string[]; }` | `{
        'image/*': [],
      }` | Set accepted file types. See https://github.com/okonet/attr-accept for more information. |
| alt | `string` | - | Alt text |
| src | `string` | - | Image URL |
| size | `"xxsmall" \| "xsmall" \| "small" \| "medium" \| "large"` | `small` | Size of the avatar |
| avatarStyle | `CSSProperties` | - | Avatar style |
| disabled | `boolean` | `false` | Enable/disable the dropzone |
| maxSize | `number` | `104857600` | Maximum file size (in bytes) |
| minSize | `number` | `0` | Minimum file size (in bytes) |
| onEdit | `((event: MouseEvent<Element, MouseEvent>) => void)` | - | Callback for when there is already a source and user clicks on the avatar. |
| onFocus | `((event: FocusEvent<HTMLElement, Element>) => void)` | - | Callback for focusing |
| onBlur | `((event: FocusEvent<HTMLElement, Element>) => void)` | - | Callback for losing focus |
| onDropAccepted | `<T extends File>(files: T, event: DropEvent) => void` | - | Callback for when the drop event occurs. Note that if file is not accepted, this callback is not invoked., |
| onDropRejected | `(fileRejection: FileRejection, event: DropEvent) => void` | - | Callback for when the drop event occurs. Note that if file is not rejected, this callback is not invoked. |
| onDrop | `<T extends File>(acceptedFile: T \| null, fileRejection: FileRejection \| null, event: DropEvent) => void` | - | Callback for when the drop event occurs. Note that the onDrop callback will always be invoked regardless if the dropped file was accepted or rejected. |
| validator | `(<T extends File>(file: T) => FileError \| null)` | - | Custom validation function (file: File) => FileError \| FileError[] \| null |
| value | `FileUpload` | - | Value to be used for forms |
| status | `"error" \| "default"` | - | Indicate `AvatarUpload` is in `error` or `default` state |
| uploading | `boolean` | `false` | Indicate whether the selected file is being uploaded |
| autoFocus | `boolean` | - | Indicate whether component has focused state as default |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |

### Default

```tsx
import React from 'react'
import { AvatarUpload, Container } from '@toptal/picasso'
import { SPACING_6 } from '@toptal/picasso-utils'

const Example = () => {
  return (
    <Container padded={SPACING_6}>
      <AvatarUpload />
    </Container>
  )
}

export default Example
```

### With upload

Shows how the component can be used with FileReader to upload a file

```tsx
import React, { useState } from 'react'
import { AvatarUpload, Container } from '@toptal/picasso'
import { SPACING_6 } from '@toptal/picasso-utils'
import type { FileRejection } from '@toptal/picasso/AvatarUpload'

const Example = () => {
  const [uploading, setUploading] = useState<boolean>(false)
  const [src, setSrc] = useState<string | undefined>()

  const handleDrop = (
    acceptedFile: File | null,
    fileRejection: FileRejection | null
  ) => {
    if (acceptedFile) {
      // simulate upload
      const reader = new FileReader()

      reader.readAsDataURL(acceptedFile)

      reader.onload = () => {
        setUploading(true)

        setTimeout(() => {
          setUploading(false)

          // simulate upload success
          setSrc(reader.result as string)
        }, 1000)
      }

      reader.onerror = error => {
        console.log('Error: upload failed, ', error)
      }
    } else if (fileRejection) {
      // file rejected
      console.log(fileRejection.errors.join(', '))
    }
  }

  return (
    <Container padded={SPACING_6}>
      <AvatarUpload
        alt='Jacqueline Roque. Pablo Picasso, 1954'
        onDrop={handleDrop}
        src={src}
        uploading={uploading}
      />
    </Container>
  )
}

export default Example
```

### Sizes

```tsx
import React from 'react'
import { AvatarUpload, Container } from '@toptal/picasso'
import { SPACING_6 } from '@toptal/picasso-utils'

const Example = () => {
  return (
    <Container flex gap={SPACING_6} padded={SPACING_6} alignItems='flex-end'>
      <AvatarUpload size='xxsmall' />
      <AvatarUpload size='xsmall' />
      <AvatarUpload size='small' />
      <AvatarUpload size='medium' />
      <AvatarUpload size='large' />
    </Container>
  )
}

export default Example
```

### States

```tsx
import React from 'react'
import { AvatarUpload, Container, Typography } from '@toptal/picasso'
import { SPACING_6 } from '@toptal/picasso-utils'

const HoveredExample = () => (
  <Container flex direction='column' alignItems='center'>
    <Typography variant='heading' size='small'>
      Hovered
    </Typography>
    <AvatarUpload alt='avatar-upload' autoHover />
  </Container>
)

const FocusedExample = () => (
  <Container flex direction='column' alignItems='center'>
    <Typography variant='heading' size='small'>
      Focused
    </Typography>
    <AvatarUpload alt='avatar-upload' autoFocus />
  </Container>
)

const ErrorExample = () => (
  <Container flex direction='column' alignItems='center'>
    <Typography variant='heading' size='small'>
      Error
    </Typography>
    <AvatarUpload alt='avatar-upload' status='error' />
  </Container>
)

const FocusedAndErrorExample = () => (
  <Container flex direction='column' alignItems='center'>
    <Typography variant='heading' size='small'>
      Focused & Error
    </Typography>
    <AvatarUpload alt='avatar-upload' status='error' autoFocus />
  </Container>
)

const LoadingExample = () => (
  <Container flex direction='column' alignItems='center'>
    <Typography variant='heading' size='small'>
      Loading
    </Typography>
    <AvatarUpload alt='avatar-upload' uploading />
  </Container>
)

const ActiveExample = () => (
  <Container flex direction='column' alignItems='center'>
    <Typography variant='heading' size='small'>
      Active
    </Typography>
    <AvatarUpload alt='avatar-upload' defaultActive />
  </Container>
)

const Example = () => (
  <Container flex padded={SPACING_6} gap={SPACING_6}>
    <HoveredExample />
    <FocusedExample />
    <ErrorExample />
    <FocusedAndErrorExample />
    <LoadingExample />
    <ActiveExample />
  </Container>
)

export default Example
```

### Using ref

Shows how to use the ref to access the component after clicking edit

```tsx
import React, { useRef, useState } from 'react'
import { AvatarUpload, Container } from '@toptal/picasso'
import { SPACING_6 } from '@toptal/picasso-utils'

const Example = () => {
  const [src, setSrc] = useState('./jacqueline-with-flowers-1954-square.jpg')
  const avatarUploadRef = useRef<HTMLElement>(null)

  const handleEdit = () => {
    // as an example, we may want user to select a new image while editting
    avatarUploadRef.current?.click()
  }

  const handleDropAccepted = (acceptedFile: File) => {
    const reader = new FileReader()

    reader.readAsDataURL(acceptedFile)

    reader.onload = () => {
      setSrc(reader.result as string)
    }

    reader.onerror = error => {
      console.log('Error: upload failed, ', error)
    }
  }

  return (
    <Container padded={SPACING_6}>
      <AvatarUpload
        ref={avatarUploadRef}
        onEdit={handleEdit}
        onDropAccepted={handleDropAccepted}
        alt='avatar'
        src={src}
      />
    </Container>
  )
}

export default Example
```
