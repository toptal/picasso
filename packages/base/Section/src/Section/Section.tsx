import cx from 'classnames'
import type { ReactNode } from 'react'
import React, { forwardRef, useState } from 'react'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import { Collapse } from '@material-ui/core'
import type { SizeType, BaseProps } from '@toptal/picasso-shared'
import { ButtonCircular } from '@toptal/picasso-button'
import { Container } from '@toptal/picasso-container'
import { Typography } from '@toptal/picasso-typography'
import { isString , Rotate180 } from '@toptal/picasso-utils'
import { ArrowDownMinor16 } from '@toptal/picasso-icons'

import styles from './styles'

type VariantType = 'bordered' | 'default' | 'withHeaderBar'

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
  titleSize?: SizeType<'small' | 'medium'>
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoSection',
})

export const Section = forwardRef<HTMLDivElement, Props>(function Section(
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
    variant = 'default',
    titleSize = 'medium',
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
        as={isString(title) ? undefined : 'div'}
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
        as={isString(subtitle) ? undefined : 'div'}
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
      <ButtonCircular
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
          [classes[variant]]: true,
          [classes.collapsed]: variant === 'default' && collapsed,
        },
        classes.root,
        className
      )}
      variant={
        ['bordered', 'withHeaderBar'].includes(variant) ? 'white' : undefined
      }
      style={style}
      {...rest}
    >
      {hasHeader && (
        <Container
          data-testid={testIds?.header}
          className={cx({
            [classes[`${variant}Header`]]: true,
            [classes[`${variant}CollapsedHeader`]]: collapsed,
          })}
        >
          {renderTitle()}
          {renderSubtitle()}
          {renderActions()}
        </Container>
      )}
      <Collapse in={!collapsed} unmountOnExit>
        <Container className={classes[`${variant}SectionContent`]}>
          {children}
        </Container>
      </Collapse>
    </Container>
  )
})

Section.displayName = 'Section'
Section.defaultProps = {
  collapsible: false,
  defaultCollapsed: true,
  titleSize: 'medium',
}

export default Section
