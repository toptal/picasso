import React from 'react'
import type { BaseProps } from '@toptal/picasso-shared'
import Container from '@toptal/picasso/Container'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import cx from 'classnames'

import type { ASTType } from './types'
import useRichText from './hooks/useRichText'
import styles from './styles'

export interface Props extends BaseProps {
  /**
   * [hast](https://github.com/syntax-tree/hast) format
   */
  value: ASTType
}

const useStyles = makeStyles<Theme>(styles, { name: 'PicassoRichText' })

export const RichText = ({
  value,
  style,
  className,
  'data-testid': dataTestId,
}: Props) => {
  const richText = useRichText(value)

  const classes = useStyles()

  return (
    <Container
      style={style}
      data-testid={dataTestId}
      className={cx(classes.root, className)}
      gap='xsmall'
      flex
      direction='column'
    >
      {richText}
    </Container>
  )
}

export default RichText
