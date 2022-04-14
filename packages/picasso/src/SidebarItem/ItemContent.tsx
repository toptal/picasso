import React from 'react'
import { useTitleCase } from '@toptal/picasso-shared'
import { ClassNameMap } from '@material-ui/core/styles/withStyles'
import cx from 'classnames'

import Typography from '../Typography'
import Container from '../Container'
import { Props as SidebarItemProps } from '../SidebarItem/SidebarItem'

interface Props extends SidebarItemProps {
  classes: ClassNameMap<string>
  testIds?: {
    content?: string
  }
}
export const ItemContent = (props: Props) => {
  const {
    children,
    classes,
    titleCase: propsTitleCase,
    icon,
    isContentVisible,
    testIds
  } = props
  const titleCase = useTitleCase(propsTitleCase)

  const hasIcon = Boolean(icon)

  const resolvedChildren =
    typeof children === 'string' ? (
      <Typography color='inherit' size='medium' titleCase={titleCase} noWrap>
        {children}
      </Typography>
    ) : (
      children
    )

  return (
    <Container className={classes.noWrap} inline flex alignItems='center'>
      {icon}
      <Container
        className={cx(classes.label, classes.noWrap, {
          [classes.withIcon]: hasIcon,
          [classes.hiddenContent]: !isContentVisible
        })}
        flex
        alignItems='center'
        data-testid={testIds?.content}
      >
        {resolvedChildren}
      </Container>
    </Container>
  )
}
