import React, { forwardRef, HTMLAttributes } from 'react'
import cx from 'classnames'
import { BaseProps } from '@toptal/picasso-shared'
import { makeStyles, Theme } from '@material-ui/core/styles'

import Container from '../Container'
import FileListItem from '../FileListItem'
import { FileUpload } from '../FileInput/types'
import styles from './styles'

export interface Props extends BaseProps, HTMLAttributes<HTMLDivElement> {
  files: FileUpload[]
  onItemRemove?: (fileName: string, index: number) => void
  disabled?: boolean
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'FileList'
})

export const FileList = forwardRef<HTMLDivElement, Props>(function FileList (
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
          file: { name, size, lastModified }
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

FileList.defaultProps = {}

FileList.displayName = 'FileList'

export default FileList
