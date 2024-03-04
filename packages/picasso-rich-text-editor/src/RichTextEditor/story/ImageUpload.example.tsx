import React, { useState } from 'react'
import { Container, Radio } from '@toptal/picasso'
import { SPACING_6, SPACING_4, SPACING_8 } from '@toptal/picasso-utils'
import type { UploadedImage } from '@toptal/picasso-rich-text-editor'
import { ImagePlugin, RichTextEditor } from '@toptal/picasso-rich-text-editor'

import type { RichTextEditorChangeHandler } from '../types'

// Imitate file upload function that sets image URL
const onUploadSucceeded = (uploadedImage: UploadedImage) =>
  new Promise<UploadedImage>(resolve => {
    setTimeout(() => {
      const fileUrl = `./jacqueline/128x128.jpg?originalFileName=${encodeURIComponent(
        uploadedImage.file.name
      )}`

      resolve({ ...uploadedImage, url: fileUrl })
    }, 2000)
  })

// Imitate failure during upload
const onUploadFailed = () =>
  new Promise<UploadedImage>((resolve, reject) => {
    setTimeout(() => {
      reject('Upload failed')
    }, 2000)
  })

const Example = () => {
  const [value, setValue] = useState<string | undefined>()
  const [useSuccessfulUpload, setUseSuccessfullUpload] = useState('true')

  const handleChange: RichTextEditorChangeHandler = newValue =>
    setValue(newValue)

  return (
    <>
      <Container bottom={SPACING_6}>
        <Radio.Group
          name='onUploadCase'
          onChange={(event: React.ChangeEvent<{ value: string }>) => {
            setUseSuccessfullUpload(event.target.value)
          }}
          value={useSuccessfulUpload}
        >
          <Radio label='Simulate successful upload' value='true' />
          <Radio label='Simulate failing upload' value='false' />
        </Radio.Group>
      </Container>
      <RichTextEditor
        id='editor'
        onChange={handleChange}
        placeholder='Write some cool rich text'
        plugins={[
          <ImagePlugin
            onUpload={
              useSuccessfulUpload === 'true'
                ? onUploadSucceeded
                : onUploadFailed
            }
          />,
        ]}
      />
      <Container
        padded={SPACING_4}
        top={SPACING_8}
        style={{
          fontFamily: "Consolas, 'Courier New', monospace",
          background: 'lightyellow',
        }}
      >
        {value}
      </Container>
    </>
  )
}

export default Example
