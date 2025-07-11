import type { HTMLAttributes } from 'react'
import React, { forwardRef } from 'react'
import cx from 'classnames'
import type { BaseProps } from '@toptal/picasso-shared'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import { Container } from '@toptal/picasso-container'

import { FileListItem } from '../FileListItem'
import type { FileUpload } from '../FileInput'
import styles from './styles'

export interface Props extends BaseProps, HTMLAttributes<HTMLDivElement> {
  files: FileUpload[]
  onItemRemove?: (fileName: string, index: number) => void
  disabled?: boolean
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'FileList',
})

export const FileList = forwardRef<HTMLDivElement, Props>(function FileList(
  props,
  ref
) {
  const { files, disabled, onItemRemove, ...rest } = props

  const classes = useStyles()

  return (
    <Container
      {...rest}
      ref={ref}
      flex
      direction='column'
      className={cx(classes.root)}
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
