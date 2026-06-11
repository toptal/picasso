import type { HTMLAttributes } from 'react'
import React, { forwardRef } from 'react'
import type { BaseProps } from '@toptal/picasso-shared'
import { Container } from '@toptal/picasso-container'

import { FileListItem } from '../FileListItem'
import type { FileUpload } from '../FileInput'
import { rootClasses } from './styles'

export interface Props extends BaseProps, HTMLAttributes<HTMLDivElement> {
  files: FileUpload[]
  onItemRemove?: (fileName: string, index: number) => void
  disabled?: boolean
}

export const FileList = forwardRef<HTMLDivElement, Props>(function FileList(
  props,
  ref
) {
  const { files, disabled, onItemRemove, ...rest } = props

  return (
    <Container
      {...rest}
      ref={ref}
      flex
      direction='column'
      className={rootClasses}
    >
      {files.map((fileUpload, index) => {
        const {
          file: { name, size, lastModified },
        } = fileUpload

        return (
          <FileListItem
            file={fileUpload}
            index={index}
            onRemove={onItemRemove}
            disabled={disabled}
            key={`${name}-${size}-${lastModified}-${String(index)}`}
          />
        )
      })}
    </Container>
  )
})

FileList.displayName = 'FileList'

export default FileList
