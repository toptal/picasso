import cx from 'classnames'
import React, { forwardRef, ReactNode, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  ArrowDownMinor16,
  BaseProps,
  Button,
  Container,
  Typography
} from '@toptal/picasso'
import { Collapse } from '@material-ui/core'

import styles from './styles'

export interface Props extends BaseProps {
  /** Title of the Section */
  title?: ReactNode
  /** Subtitle of the Section */
  subtitle?: ReactNode
  /** Additional actions of the Section */
  actions?: ReactNode
  /** Main content of the Section */
  children?: ReactNode
  /** Whether section can be collapsed */
  collapsible?: boolean
  testIds?: {
    header?: string
    title?: string
    subtitle?: string
    actions?: string
    collapse?: string
  }
}

const useStyles = makeStyles(styles, {
  name: 'PicassoSection'
})

export const Section = forwardRef<HTMLDivElement, Props>(function Section (
  props,
  ref
) {
  const {
    className,
    style,
    title,
    subtitle,
    actions,
    children,
    testIds,
    collapsible,
    ...rest
  } = props
  const classes = useStyles()
  const [collapsed, setCollapsed] = useState(false)

  const handleCollapse = () => setCollapsed(!collapsed)

  const renderTitle = () =>
    title ? (
      <Typography
        className={classes.title}
        data-testid={testIds?.title}
        variant='heading'
        size='medium'
      >
        {title}
      </Typography>
    ) : null

  const renderSubtitle = () =>
    subtitle ? (
      <Typography
        className={classes.subtitle}
        data-testid={testIds?.subtitle}
        size='medium'
        color='dark-grey'
      >
        {subtitle}
      </Typography>
    ) : null

  const renderCollapse = () =>
    collapsible ? (
      <Button.Circular
        className={cx(classes.collapse, {
          [classes.collapseActive]: collapsed
        })}
        onClick={handleCollapse}
        data-testid={testIds?.collapse}
        variant='flat'
        icon={<ArrowDownMinor16 />}
      />
    ) : null

  const hasActions = actions || collapsible
  const renderActions = () =>
    hasActions ? (
      <Container data-testid={testIds?.actions} className={classes.actions}>
        {actions}
        {renderCollapse()}
      </Container>
    ) : null

  const hasHeader = title || subtitle || hasActions

  return (
    <Container
      ref={ref}
      className={cx(classes.root, className)}
      style={style}
      {...rest}
    >
      {hasHeader && (
        <Container data-testid={testIds?.header} className={classes.header}>
          {renderTitle()}
          {renderSubtitle()}
          {renderActions()}
        </Container>
      )}
      <Collapse in={!collapsed} unmountOnExit>
        {children}
      </Collapse>
    </Container>
  )
})

Section.displayName = 'Section'
Section.defaultProps = { collapsible: false }

export default Section
