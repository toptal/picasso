# Dropzone

## Props

### Dropzone

| Name | Type | Default | Description |
|------|------|---------|-------------|
| accept | `string \| string[]` | - | Set accepted file types. See https://github.com/okonet/attr-accept for more information. Keep in mind that mime type determination is not reliable across platforms. CSV files, for example, are reported as text/plain under macOS but as application/vnd.ms-excel under Windows. In some cases there might not be a mime type set at all. See: https://github.com/react-dropzone/react-dropzone/issues/276 |
| disabled | `boolean` | `false` | Enable/disable the dropzone |
| maxSize | `number` | - | Maximum file size (in bytes) |
| minSize | `number` | `0` | Minimum file size (in bytes) |
| multiple | `boolean` | `true` | Allow drag 'n' drop (or selection from the file dialog) of multiple files |
| hint | `string` | - | The text of the hint |
| hideContentText | `boolean` | - | Hide/Show the content text |
| onRemove | `((fileName: string, index: number) => void)` | - | Callback invoked when a file item is removed |
| onDropAccepted | `(files: File[], event) => void` | - | Callback for when the drop event occurs. Note that if no files are accepted, this callback is not invoked. |
| onDropRejected | `(fileRejections: FileRejection[], event) => void` | - | Callback for when the drop event occurs. Note that if no files are rejected, this callback is not invoked. |
| onDrop | `(acceptedFiles: File[], fileRejections: FileRejection[], event:DragEvent \| Event) => void` | - |  Callback for when the drop event occurs. Note that this callback is invoked after the getFilesFromEvent callback is done.  Files are accepted or rejected based on the accept, multiple, minSize and maxSize props. accept must be a valid MIME type according to input element specification or a valid file extension. If multiple is set to false and additional files are dropped, all files besides the first will be rejected. Any file which does not have a size in the minSize, maxSize range, will be rejected as well.  Note that the onDrop callback will always be invoked regardless if the dropped files were accepted or rejected. If you'd like to react to a specific scenario, use the onDropAccepted/onDropRejected props.  onDrop will provide you with an array of File objects which you can then process and send to a server. For example, with SuperAgent as a http/ajax library:        function onDrop(acceptedFiles) {         const req = request.post('/upload')         acceptedFiles.forEach(file => {           req.attach(file.name, file)         })         req.end(callback)       }        |
| validator | `(file:File) => FileError \| FileError[] \| null` | - | Custom validation function |
| value | `FileUpload[]` | - | Value uses the File interface. |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |

### Default

```tsx
import React from 'react'
import { Dropzone } from '@toptal/picasso'

const Example = () => {
  return <Dropzone />
}

export default Example
```

### With upload

```tsx
import React, { useEffect, useState } from 'react'
import type {
  DropzoneFileUpload,
  DropzoneFileError,
  DropzoneFileRejection,
} from '@toptal/picasso'
import { Dropzone, DropzoneErrorCode } from '@toptal/picasso'

const MAX_SIZE = 600 * 1000

const customSizeValidator = (file: File): DropzoneFileError[] | null => {
  if (file.size > MAX_SIZE) {
    return [
      {
        code: DropzoneErrorCode.FileTooLarge,
        message: `File size exceeds the ${MAX_SIZE / 1000 / 1000}MB.`,
      },
    ]
  }

  return null
}

const useFiles = ({ maxFiles }: { maxFiles: number }) => {
  const [files, setFiles] = useState<DropzoneFileUpload[]>([])
  const [disabled, setDisabled] = useState<boolean>(false)

  useEffect(() => {
    if (files.length >= maxFiles) {
      setDisabled(true)
    } else {
      setDisabled(false)
    }
  }, [maxFiles, files.length])

  const addFiles = (
    acceptedFiles: File[],
    rejectedFiles: DropzoneFileRejection[]
  ): void => {
    if (files.length + acceptedFiles.length + rejectedFiles.length > maxFiles) {
      return setFiles(prevFiles => [
        ...prevFiles,
        {
          error: 'Upload failed due to number of files',
          file: new File([], ''),
        },
      ])
    }

    if (acceptedFiles.length > 0) {
      const previousFiles = files
      const newFiles = acceptedFiles.map(file => ({
        file,
        uploading: true,
      }))

      setFiles([...previousFiles, ...newFiles])
      let progress = 0
      const interval = setInterval(() => {
        if (progress === 100) {
          setFiles([
            ...previousFiles,
            ...newFiles.map(file => ({ ...file, uploading: false })),
          ])
          clearInterval(interval)
        } else {
          setFiles([
            ...previousFiles,
            ...newFiles.map(file => ({ ...file, progress })),
          ])
          progress += 10
        }
      }, 250)
    }

    if (rejectedFiles.length) {
      setFiles((prevFiles: DropzoneFileUpload[]) => [
        ...prevFiles,
        ...rejectedFiles.map(({ errors, file }) => {
          const error = errors.map(error => error.message).join(', ')

          return { error, file }
        }),
      ])
    }
  }

  const removeFile = (_fileName: string, fileIndex: number) => {
    const updatedFiles = files.filter((_, index) => index !== fileIndex)

    setFiles(updatedFiles)
  }

  return {
    files,
    addFiles,
    removeFile,
    disabled,
  }
}
const Example = () => {
  const { files, addFiles, removeFile, disabled } = useFiles({
    maxFiles: 2,
  })

  return (
    <Dropzone
      value={files}
      onDrop={addFiles}
      onRemove={removeFile}
      hint={`Files allowed 2. Max file size: ${MAX_SIZE / 1000}KB`}
      accept={{
        'image/*': [],
      }}
      validator={customSizeValidator}
      disabled={disabled}
    />
  )
}

export default Example
```

### Uploading

```tsx
import React from 'react'
import { Dropzone } from '@toptal/picasso'

const value = [
  {
    uploading: true,
    progress: 30,
    file: new File(['resume.pdf'], 'resume.pdf'),
  },
]

const Example = () => {
  return (
    <Dropzone
      value={value}
      hint='Max file size: 25MB'
      accept={{
        'image/*': [],
      }}
    />
  )
}

export default Example
```

### Disabled

```tsx
import React from 'react'
import { Dropzone } from '@toptal/picasso'

const value = [
  {
    uploading: false,
    progress: 0,
    file: new File(['resume.pdf'], 'resume.pdf'),
  },
]

const Example = () => {
  return (
    <Dropzone
      disabled
      value={value}
      onDrop={() => alert('onDrop callback triggered')}
      onRemove={() => alert('onRemove callback triggered')}
      hint='Max file size: 25MB'
      accept={{
        'image/*': [],
      }}
    />
  )
}

export default Example
```

### Completed Multiple files

```tsx
import React from 'react'
import { Container, Dropzone } from '@toptal/picasso'

const value = [
  {
    uploading: false,
    progress: 0,
    file: new File(['resume.pdf'], 'resume.pdf'),
  },
  {
    uploading: false,
    progress: 0,
    file: new File(
      ['portfolio.pdf'],
      'lorem_ipsum_dolor_sit_amet_consectetur_adipisicing_elit_laborum_alias_fugiat_explicabo_unde_beatae_eaque_suscipit_ullam_eum_velit_pariatur_praesentium_sapiente_dicta_animi_iure_iste_quam_quae_labore_ullam.pdf'
    ),
  },
]

const Example = () => {
  return (
    <Container style={{ width: '600px' }}>
      <Dropzone
        value={value}
        onDrop={() => alert('onDrop callback triggered')}
        onRemove={() => alert('onRemove callback triggered')}
        hint='Files allowed: 2. Max file size: 25MB'
        accept={{
          'image/*': [],
        }}
        disabled
      />
    </Container>
  )
}

export default Example
```

### Upload Failed

```tsx
import React from 'react'
import { Dropzone } from '@toptal/picasso'

const Example = () => {
  return (
    <Dropzone
      hint='Files allowed: 2. Max file size: 25MB'
      accept={{
        'image/*': [],
      }}
      value={[
        {
          file: new File(['resume.pdf'], 'resume.pdf'),
          error: 'File size exceeds the 25MB limit.',
        },
        {
          file: new File(['portfolio.pdf'], 'portfolio.pdf'),
        },
      ]}
      onRemove={() => undefined}
    />
  )
}

export default Example
```

### Single File

```tsx
import React, { useState } from 'react'
import { Dropzone } from '@toptal/picasso'

const value = [
  {
    uploading: false,
    progress: 0,
    file: new File(['resume.pdf'], 'resume.pdf'),
  },
]

const Example = () => {
  const [files, setFiles] = useState(value)

  const addFile = (acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map(file => ({
      file,
      uploading: false,
      progress: 0,
    }))

    setFiles(newFiles)
  }

  const handleRemove = () => {
    setFiles([])
  }

  return (
    <Dropzone
      multiple={false}
      value={files}
      onDrop={addFile}
      onRemove={handleRemove}
      accept={{
        'image/*': [],
      }}
    />
  )
}

export default Example
```
