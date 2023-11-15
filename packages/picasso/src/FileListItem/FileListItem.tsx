import React from 'react'
import cx from 'classnames'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'

import Container from '../Container'
import { SPACING_2 } from '../utils'
import Typography from '../Typography'
import Tooltip from '../Tooltip'
import ButtonCircular from '../ButtonCircular'
import Loader from '../Loader'
import ProgressBar from '../ProgressBar'
import { Attachment16, Trash16, CloseMinor16 } from '../Icon'
import type { FileUpload } from '../FileInput/types'
import styles from './styles'
import TypographyOverflow from '../TypographyOverflow'

export interface Props {
  file: FileUpload
  index: number
  disabled?: boolean
  onRemove?: (fileName: string, index: number) => void
  testIds?: {
    progressBar?: string
  }
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'FileListItem',
})

const FileListItem = ({ file, index, disabled, onRemove, testIds }: Props) => {
  const {
    uploading,
    progress,
    error,
    file: { name },
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
        <ProgressBar data-testid={testIds?.progressBar} value={progress} />
      ) : (
        <Loader className={classes.loader} size='small' />
      )}
    </>
  )

  const fileNode = (
    <>
      <Container
        flex
        direction='column'
        className={cx(classes.fileNodeContent)}
      >
        <Container flex direction='row'>
          {!error && (
            <Container right={SPACING_2}>
              <Attachment16 color='darkGrey' />
            </Container>
          )}
          <TypographyOverflow
            className={classes.label}
            variant='body'
            size='medium'
            color={error ? 'red' : 'black'}
          >
            {name}
          </TypographyOverflow>
        </Container>
        <Typography
          className={classes.error}
          variant='body'
          size='xsmall'
          color='red'
        >
          {error}
        </Typography>
      </Container>
      {onRemove && (
        <Tooltip
          compact
          placement='top'
          content={error ? 'Dismiss' : 'Remove File'}
        >
          <ButtonCircular
            variant='flat'
            onClick={handleRemove}
            disabled={disabled}
          >
            {error ? <CloseMinor16 color='red' /> : <Trash16 color='red' />}
          </ButtonCircular>
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
