import React, {
  forwardRef,
  HTMLAttributes,
  ReactElement,
  cloneElement,
} from 'react'
import { Theme } from '@mui/material/styles';

import makeStyles from '@mui/styles/makeStyles';

import { Search16 as Search } from '../Icon'
import Container from '../Container'
import Typography from '../Typography'
import styles from './styles'

export interface Props extends HTMLAttributes<HTMLDivElement> {
  /** Adds <Icon /> before EmptyStateCollection content */
  icon?: ReactElement
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoEmptyStateCollection',
})

export const EmptyStateCollection = forwardRef<HTMLDivElement, Props>(
  function EmptyStateCollection(props, ref) {
    const classes = useStyles()
    const { icon, children, style, ...rest } = props
    const iconProps = {
      className: classes.icon,
      color: 'dark-grey' as const,
    }
    const iconElement = icon ? (
      cloneElement(icon, iconProps)
    ) : (
      <Search {...iconProps} />
    )

    return (
      <Container {...rest} alignItems='center' flex ref={ref} style={style}>
        <Container
          alignItems='center'
          className={classes.iconWrapper}
          flex
          right='xsmall'
        >
          {iconElement}
        </Container>
        <Container>
          <Typography size='xsmall'>{children}</Typography>
        </Container>
      </Container>
    )
  }
)

EmptyStateCollection.displayName = 'EmptyStateCollection'

export default EmptyStateCollection
