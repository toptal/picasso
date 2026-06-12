# FileInput

Input file control

## Props

### FileInput

| Name | Type | Default | Description |
|------|------|---------|-------------|
| accept | `string` | - | A string that defines the file types the file input should accept |
| disabled | `boolean` | - | If true, the 'FileInput' will be disabled |
| buttonLabel | `string` | `Choose File` | The text of the select file button |
| hint | `string` | - | The text of the hint |
| maxFiles | `number \| null` | `1` | Maximum number of files allowed. When the value is null, unlimited files can be added and multiple files can be selected on the file selection dialog |
| value | `FileUpload[]` | - | Value uses the File interface. |
| onChange | `((event: ChangeEvent<HTMLInputElement>) => void)` | - | Callback invoked when `FileInput` changes its state by selecting new files |
| onRemove | `((fileName: string, index: number) => void)` | - | Callback invoked when a file item is removed |
| onFocus | `FocusEventHandler<HTMLDivElement>` | - | Focus event handler |
| onBlur | `FocusEventHandler<HTMLDivElement>` | - | Blur event handler |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |

### Default

```tsx
import React, { useState } from 'react'
import { FileInput } from '@toptal/picasso'

import type { FileUpload } from '../../FileInput/types'

const useFiles = (initialFiles?: FileUpload[]) => {
  const [files, setFiles] = useState<FileUpload[]>(initialFiles ?? [])

  const addFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target || !event.target.files || !event.target.files.length) {
      return null
    }
    setFiles([
      ...files,
      ...Array.from(event.target.files).map(file => ({ file })),
    ])
  }

  const removeFile = (fileName: string, fileIndex: number) => {
    const updatedFiles = files.filter((_, index) => index !== fileIndex)

    setFiles(updatedFiles)
  }

  return {
    files,
    addFiles,
    removeFile,
  }
}

const Example = () => {
  const { files, addFiles, removeFile } = useFiles()

  return (
    <FileInput
      value={files}
      onChange={addFiles}
      onRemove={removeFile}
      hint='Max file size: 25MB'
    />
  )
}

export default Example
```

### Custom label

```tsx
import React from 'react'
import { FileInput } from '@toptal/picasso'

const Example = () => (
  <FileInput buttonLabel='Upload File' hint='Max file size: 25MB' />
)

export default Example
```

### Initial value

```tsx
import React, { useState } from 'react'
import { FileInput } from '@toptal/picasso'

import type { FileUpload } from '../../FileInput/types'

const useFiles = (initialFiles?: FileUpload[]) => {
  const [files, setFiles] = useState<FileUpload[]>(initialFiles ?? [])

  const addFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target || !event.target.files || !event.target.files.length) {
      return null
    }
    setFiles([
      ...files,
      ...Array.from(event.target.files).map(file => ({ file })),
    ])
  }

  const removeFile = (fileName: string, fileIndex: number) => {
    const updatedFiles = files.filter((_, index) => index !== fileIndex)

    setFiles(updatedFiles)
  }

  return {
    files,
    addFiles,
    removeFile,
  }
}

const Example = () => {
  const { files, addFiles, removeFile } = useFiles([
    { file: new File(['image.png'], 'image.png') },
  ])

  return (
    <FileInput
      value={files}
      onChange={addFiles}
      onRemove={removeFile}
      hint='Max file size: 25MB'
    />
  )
}

export default Example
```

### Limited file count

```tsx
import React, { useState } from 'react'
import { FileInput } from '@toptal/picasso'

import type { FileUpload } from '../../FileInput/types'

const useFiles = (initialFiles?: FileUpload[]) => {
  const [files, setFiles] = useState<FileUpload[]>(initialFiles ?? [])

  const addFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target || !event.target.files || !event.target.files.length) {
      return null
    }
    setFiles([
      ...files,
      ...Array.from(event.target.files).map(file => ({ file })),
    ])
  }

  const removeFile = (fileName: string, fileIndex: number) => {
    const updatedFiles = files.filter((_, index) => index !== fileIndex)

    setFiles(updatedFiles)
  }

  return {
    files,
    addFiles,
    removeFile,
  }
}

const Example = () => {
  const { files, addFiles, removeFile } = useFiles()

  return (
    <FileInput
      value={files}
      onChange={addFiles}
      onRemove={removeFile}
      maxFiles={3}
      hint='Max. 3 files'
    />
  )
}

export default Example
```

### Error

```tsx
import React from 'react'
import { FileInput } from '@toptal/picasso'

const Example = () => (
  <div>
    <FileInput
      value={[
        {
          file: new File(['resume.pdf'], 'resume.pdf'),
          error: 'File size exceeds the 25MB limit.',
        },
      ]}
      hint='Max file size: 25MB'
      onRemove={() => undefined}
    />
  </div>
)

export default Example
```

### Disabled

```tsx
import React from 'react'
import { FileInput } from '@toptal/picasso'

const Example = () => (
  <div>
    <FileInput
      value={[
        { file: new File(['image.png'], 'image.png') },
        { file: new File(['avatar.png'], 'avatar.png') },
        {
          file: new File(['resume.pdf'], 'resume.pdf'),
          error: 'File size exceeds the 25MB limit.',
        },
      ]}
      hint='Max file size: 25MB'
      onRemove={() => undefined}
      maxFiles={null}
      disabled
    />
  </div>
)

export default Example
```

### Uploading

```tsx
import React from 'react'
import { FileInput, Container, Typography } from '@toptal/picasso'
import { SPACING_6, SPACING_4 } from '@toptal/picasso-utils'

const Example = () => (
  <div>
    <Container bottom={SPACING_6}>
      <Container bottom={SPACING_4}>
        <Typography variant='heading' size='medium'>
          Progress:
        </Typography>
      </Container>

      <FileInput
        value={[
          {
            file: new File(['image.png'], 'image.png'),
            progress: 42,
            uploading: true,
          },
        ]}
        hint='Max file size: 25MB'
      />
    </Container>

    <Container bottom={SPACING_6}>
      <Container bottom={SPACING_4}>
        <Typography variant='heading' size='medium'>
          Undetermined:
        </Typography>
      </Container>

      <FileInput
        value={[
          {
            file: new File(['image.png'], 'image.png'),
            uploading: true,
          },
        ]}
        hint='Max file size: 25MB'
      />
    </Container>
  </div>
)

export default Example
```

### Allowed Extensions

```tsx
import React from 'react'
import { Container, FileInput } from '@toptal/picasso'
import { SPACING_2 } from '@toptal/picasso-utils'

const Example = () => (
  <div>
    <Container bottom={SPACING_2}>
      <FileInput accept='image/png' hint='Accept png image files' />
    </Container>

    <Container bottom={SPACING_2}>
      <FileInput accept='image/*' hint='Accept all image files' />
    </Container>

    <Container bottom={SPACING_2}>
      <FileInput accept='.js' hint='Accept *.js files' />
    </Container>

    <Container bottom={SPACING_2}>
      <FileInput accept='application/pdf' hint='Accept pdf files' />
    </Container>
  </div>
)

export default Example
```

### With Uploader

Showcase how to integrate FileInput with uploading logic. Randomly returns errors and allows only upload of image files

```tsx
import React, { useEffect, useState } from 'react'
import { FileInput, Form } from '@toptal/picasso'

import type { FileUpload } from '../../FileInput/types'

const useUploader = (config: { maxSize: number; files?: FileUpload[] }) => {
  let intervalID: number | null = null
  const [files, setFiles] = useState(config.files || [])
  const maxSize = config.maxSize ? config.maxSize * 1024 * 1024 : undefined

  useEffect(() => {
    return () => {
      if (intervalID !== null) {
        clearInterval(intervalID)
      }
    }
  }, [])

  const remove = (fileName: string, fileIndex: number) => {
    const updatedFiles = files.filter((_, index) => index !== fileIndex)

    setFiles(updatedFiles)
  }

  const upload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target || !event.target.files || !event.target.files.length) {
      return null
    }

    const previousFiles = files
    const newFiles = Array.from(event.target.files).map(newFile => {
      const invalidFile = (maxSize && newFile.size > maxSize) || false

      return {
        file: newFile,
        uploading: !invalidFile,
        progress: !invalidFile ? 0 : undefined,
        error: invalidFile
          ? `File size exceeds the ${config.maxSize}MB limit.`
          : undefined,
      }
    })

    // reset input
    event.target.value = ''

    setFiles([...previousFiles, ...newFiles])

    let progress = 0

    intervalID = window.setInterval(() => {
      progress += 10
      const uploadFinished = progress >= 100

      const updatedFiles = newFiles.map(file => {
        if (!file.uploading) {
          return file
        }

        return {
          ...file,
          uploading: !uploadFinished,
          progress,
          error:
            uploadFinished && Math.random() < 0.5 ? 'Server error.' : undefined,
        }
      })

      setFiles([...previousFiles, ...updatedFiles])

      if (uploadFinished && intervalID !== null) {
        clearInterval(intervalID)
      }
    }, 200)
  }

  return {
    files,
    upload,
    remove,
  }
}

const Example = () => {
  const MAX_SIZE = 2

  const { files, upload, remove } = useUploader({
    maxSize: MAX_SIZE,
  })

  return (
    <Form.Field>
      <Form.Label>Profile picture</Form.Label>
      <FileInput
        value={files}
        accept='image/*'
        hint={`Accept all image files. Max file size: ${MAX_SIZE}MB.`}
        onChange={upload}
        onRemove={remove}
        maxFiles={null}
      />
    </Form.Field>
  )
}

export default Example
```

### FileList

List of files

```tsx
import React from 'react'
import { FileList } from '@toptal/picasso'

const Example = () => {
  const files = [
    {
      uploading: false,
      progress: 0,
      name: 'File 1',
      file: new File(['resume.pdf'], 'resume.pdf'),
    },
    {
      uploading: true,
      progress: 30,
      name: 'File under upload',
      file: new File(['resume.pdf'], 'resume.pdf'),
    },
    {
      uploading: true,
      progress: 30,
      name: 'File under upload with error',
      error: 'File is too large',
      file: new File(['resume.pdf'], 'resume.pdf'),
    },
  ]

  return (
    <div style={{ maxWidth: '300px' }}>
      <FileList files={files} onItemRemove={() => {}} />
    </div>
  )
}

export default Example
```
