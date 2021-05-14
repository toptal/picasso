import React, { forwardRef, HTMLAttributes } from 'react'
import cx from 'classnames'
import { BaseProps } from '@toptal/picasso-shared'
import { makeStyles, Theme } from '@material-ui/core/styles'

import Container from '../Container'
import FileListItem from '../FileListItem'
import { File } from './types'
import styles from './styles'

export interface Props extends BaseProps, HTMLAttributes<HTMLDivElement> {
  files: File[]
  onItemRemove?: (fileName: string) => void
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'FileList'
})

export const FileList = forwardRef<HTMLDivElement, Props>(function FileList (
  props,
  ref
) {
  const { files, onItemRemove, ...rest } = props

  const classes = useStyles()

  return (
    <Container
      {...rest}
      ref={ref}
      flex
      direction='column'
      className={cx(classes.root)}
    >
      {files.map(file => (
        <FileListItem file={file} onRemove={onItemRemove} key={file.name} />
      ))}
    </Container>
  )
})

FileList.defaultProps = {}

FileList.displayName = 'FileList'

export default FileList
