import React from 'react'
import cx from 'classnames'
import { ProgressBar } from '@toptal/picasso-lab'
import { makeStyles, Theme } from '@material-ui/core/styles'

import Container from '../Container'
import Typography from '../Typography'
import Tooltip from '../Tooltip'
import Button from '../Button'
import Loader from '../Loader'
import { Attachment16, Trash16, CloseMinor16 } from '../Icon'
import { FileUpload } from '../FileInput/types'
import styles from './styles'

export interface Props {
  file: FileUpload
  index: number
  disabled?: boolean
  onRemove?: (fileName: string, index: number) => void
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'FileListItem'
})

const FileListItem = ({ file, index, disabled, onRemove }: Props) => {
  const {
    uploading,
    progress,
    error,
    file: { name }
  } = file

  const classes = useStyles()

  const handleRemove = () => {
    onRemove?.(name, index)
  }

  const uploadingNode = (
    <>
      <Typography
        className={classes.label}
        variant='body'
        color='black'
        size='medium'
      >
        Uploading...
      </Typography>
      {progress !== undefined ? (
        <ProgressBar
          value={progress}
          data-testid='file-list-item-progressbar'
        />
      ) : (
        <Loader className={classes.loader} size='small' />
      )}
    </>
  )

  const fileNode = (
    <>
      <Container flex direction='column'>
        <Container flex direction='row'>
          {!error && (
            <Container right='xsmall'>
              <Attachment16 />
            </Container>
          )}
          <Typography
            className={classes.label}
            variant='body'
            size='medium'
            color={error ? 'red' : 'black'}
          >
            {name}
          </Typography>
        </Container>
        <Typography
          className={classes.error}
          variant='body'
          size='small'
          color='red'
        >
          {error}
        </Typography>
      </Container>
      {onRemove && (
        <Tooltip
          compact
          placement='top'
          variant='dark'
          content={error ? 'Dismiss' : 'Remove File'}
        >
          <Button.Circular
            variant='flat'
            onClick={handleRemove}
            disabled={disabled}
          >
            {error ? <CloseMinor16 color='red' /> : <Trash16 color='red' />}
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
      className={cx(classes.root)}
    >
      {uploading && error === undefined ? uploadingNode : fileNode}
    </Container>
  )
}

export default FileListItem
