import React from 'react'
// import cx from 'classnames'
import { ProgressBar } from '@toptal/picasso-lab'
// import { makeStyles, Theme } from '@material-ui/core/styles'

import Container from '../Container'
import Typography from '../Typography'
import Tooltip from '../Tooltip'
import Button from '../Button'
import { Link16, Trash16, Close16 } from '../Icon'
import { File } from '../FileList/types'
// import styles from './styles'

export interface Props {
  file: File
  onRemove?: (fileName: string) => void
}

// const useStyles = makeStyles<Theme>(styles, {
//   name: 'FileListItem'
// })

const FileListItem = ({ file, onRemove }: Props) => {
  const { uploading, progress = 0, error, name } = file

  // const classes = useStyles()

  const handleRemove = () => {
    onRemove?.(name)
  }

  const uploadingNode = (
    <>
      <Typography variant='body' color='black' size='medium'>
        Uploading...
      </Typography>
      <ProgressBar value={progress} data-testid='file-list-item-progressbar' />
    </>
  )

  const fileNode = (
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
          <Button.Circular variant='flat' onClick={handleRemove}>
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
      // className={cx(classes.root)}
    >
      {uploading && error === undefined ? uploadingNode : fileNode}
    </Container>
  )
}

export default FileListItem
