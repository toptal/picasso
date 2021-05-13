import React, { forwardRef, HTMLAttributes } from 'react'
import cx from 'classnames'
import { ProgressBar } from '@toptal/picasso-lab'
import { BaseProps } from '@toptal/picasso-shared'
import { makeStyles, Theme } from '@material-ui/core/styles'

import Container from '../Container'
import Typography from '../Typography'
import Tooltip from '../Tooltip'
import Button from '../Button'
import { Link16, Trash16, Close16 } from '../Icon'
import styles from './styles'

interface File {
  uploading: boolean
  progress?: number
  error?: string
  name: string
}

interface FileListItemProps {
  file: File
  onRemove?: (fileName: string) => void
}

export interface Props extends BaseProps, HTMLAttributes<HTMLDivElement> {
  files: File[]
  onItemRemove?: (fileName: string) => void
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'FileList'
})

const FileListItem = ({ file, onRemove }: FileListItemProps) => {
  const { uploading, progress = 0, error, name } = file

  const classes = useStyles()

  const renderUploading = (
    <>
      <Typography variant='body' color='black' size='medium'>
        Uploading...
      </Typography>
      <ProgressBar value={progress} data-testid='file-list-item-progressbar' />
    </>
  )

  const renderFile = (
    <>
      <Container flex direction='column'>
        <Container flex direction='row'>
          {!error && (
            <Container right='xsmall'>
              <Link16 />
            </Container>
          )}
          <Typography
            variant='body'
            size='medium'
            color={error ? 'red' : 'black'}
          >
            {name}
          </Typography>
        </Container>
        <Typography variant='body' size='small' color='red'>
          {error}
        </Typography>
      </Container>
      {onRemove && (
        <Tooltip compact placement='top' variant='dark' content='Remove file'>
          <Button.Circular variant='flat' onClick={() => onRemove(name)}>
            {error ? <Close16 color='red' /> : <Trash16 color='red' />}
          </Button.Circular>
        </Tooltip>
      )}
    </>
  )

  return (
    <Container
      flex
      direction='row'
      alignItems='center'
      justifyContent='space-between'
      className={cx(classes.fileListItem)}
    >
      {uploading && !error ? renderUploading : renderFile}
    </Container>
  )
}

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
