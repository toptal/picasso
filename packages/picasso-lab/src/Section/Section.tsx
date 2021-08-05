import cx from 'classnames'
import React, { forwardRef, ReactNode, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Collapse } from '@material-ui/core'
import {
  ArrowDownMinor16,
  BaseProps,
  Button,
  Container,
  SizeType,
  Typography
} from '@toptal/picasso'
import { Rotate180 } from '@toptal/picasso/utils/Transitions'

import styles from './styles'

type VariantType = 'bordered' | 'default'

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
  /** Default collapsed value **(applied if `collapsible: true`)** */
  defaultCollapsed?: boolean
  testIds?: {
    header?: string
    title?: string
    subtitle?: string
    actions?: string
    collapse?: string
  }
  variant?: VariantType
  /** Title size of the inner text */
  titleSize?: SizeType<'small' | 'medium' | 'large' | 'xlarge'> | 'inherit'
  /** Subtitle size of the inner text */
  subtitleSize?: SizeType<'small' | 'medium' | 'large' | 'xlarge'> | 'inherit'
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
    collapsible = false,
    defaultCollapsed = true,
    variant,
    titleSize = 'medium',
    subtitleSize = 'medium',
    ...rest
  } = props
  const classes = useStyles()
  const [collapsed, setCollapsed] = useState(
    collapsible ? defaultCollapsed : false
  )

  const toggleCollapse = () => setCollapsed(!collapsed)

  const renderTitle = () =>
    title ? (
      <Typography
        className={classes.title}
        data-testid={testIds?.title}
        variant='heading'
        size={titleSize}
      >
        {title}
      </Typography>
    ) : null

  const renderSubtitle = () =>
    subtitle ? (
      <Typography
        className={classes.subtitle}
        data-testid={testIds?.subtitle}
        size={subtitleSize}
        color='dark-grey'
      >
        {subtitle}
      </Typography>
    ) : null

  const renderCollapse = () =>
    collapsible ? (
      <Button.Circular
        onClick={toggleCollapse}
        data-testid={testIds?.collapse}
        variant='flat'
        icon={
          <Rotate180 on={!collapsed}>
            <ArrowDownMinor16 />
          </Rotate180>
        }
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
      className={cx(
        {
          [classes.borderedVariant]: variant === 'bordered'
        },
        classes.root,
        className
      )}
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
Section.defaultProps = {
  collapsible: false,
  defaultCollapsed: true,
  titleSize: 'medium',
  subtitleSize: 'medium'
}

export default Section
