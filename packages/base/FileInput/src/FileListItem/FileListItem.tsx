import React from 'react'
import { Container } from '@toptal/picasso-container'
import { Typography } from '@toptal/picasso-typography'
import { Tooltip } from '@toptal/picasso-tooltip'
import { ButtonCircular } from '@toptal/picasso-button'
import { Loader } from '@toptal/picasso-loader'
import { Attachment16, Trash16, CloseMinor16 } from '@toptal/picasso-icons'
import { TypographyOverflow } from '@toptal/picasso-typography-overflow'

import { ProgressBar } from '../ProgressBar'
import type { FileUpload } from '../FileInput'
import { rootClasses, labelClasses, fileNodeContentClasses } from './styles'

export interface Props {
  file: FileUpload
  index: number
  disabled?: boolean
  onRemove?: (fileName: string, index: number) => void
  testIds?: {
    progressBar?: string
  }
}

const FileListItem = ({ file, index, disabled, onRemove, testIds }: Props) => {
  const {
    uploading,
    progress,
    error,
    file: { name },
  } = file

  const handleRemove = () => {
    onRemove?.(name, index)
  }

  const uploadingNode = (
    <>
      <Typography
        className={labelClasses}
        variant='body'
        color='black'
        size='medium'
      >
        Uploading...
      </Typography>
      {progress !== undefined ? (
        <ProgressBar data-testid={testIds?.progressBar} value={progress} />
      ) : (
        <Loader size='small' />
      )}
    </>
  )

  const fileNode = (
    <>
      <Container flex direction='column' className={fileNodeContentClasses}>
        <Container flex direction='row'>
          {!error && (
            <Container right='xsmall'>
              <Attachment16 color='darkGrey' />
            </Container>
          )}
          <TypographyOverflow
            className={labelClasses}
            variant='body'
            size='medium'
            color={error ? 'red' : 'black'}
          >
            {name}
          </TypographyOverflow>
        </Container>
        <Typography
          className='leading-4'
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
            className='shrink-0'
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
      className={rootClasses}
    >
      {uploading && error === undefined ? uploadingNode : fileNode}
    </Container>
  )
}

export default FileListItem
