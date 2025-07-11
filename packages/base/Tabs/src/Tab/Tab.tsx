import type { ReactNode, HTMLAttributes, ReactElement } from 'react'
import React, { forwardRef, useContext } from 'react'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import type { TabProps } from '@material-ui/core'
import { Tab as MUITab } from '@material-ui/core'
import type { BaseProps, TextLabelProps } from '@toptal/picasso-shared'
import { useTitleCase } from '@toptal/picasso-shared'
import { UserBadge } from '@toptal/picasso-user-badge'

import styles from './styles'
import { TabsOrientationContext } from '../Tabs/Tabs'
import { TabLabel } from '../TabLabel'
import { TabDescription } from '../TabDescription'

export interface Props
  extends BaseProps,
    TextLabelProps,
    Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * If true, the tab will be disabled
   * @default false
   */
  disabled?: boolean

  /** You can provide your own value. Otherwise, we fallback to the child position index */
  value?: TabProps['value']

  /** The label element */
  label?: ReactNode

  /** The Icon element */
  icon?: ReactElement

  /** Image URL */
  avatar?: string | null

  /** Description */
  description?: string

  // Properties below are managed by Tabs component

  selected?: boolean
  onChange?: TabProps['onChange']
  onClick?: TabProps['onClick']
}

const useStyles = makeStyles<Theme>(styles, { name: 'PicassoTab' })

export const Tab = forwardRef<HTMLDivElement, Props>(function Tab(props, ref) {
  const {
    disabled,
    value,
    label,
    icon,
    selected,
    onChange,
    onClick,
    titleCase: propsTitleCase,
    description,
    avatar,
    ...rest
  } = props
  const classes = useStyles()
  const titleCase = useTitleCase(propsTitleCase)
  const orientation = useContext(TabsOrientationContext)

  const labelComponent = getLabelComponent({
    avatar,
    description,
    disabled,
    label,
    orientation,
    titleCase,
  })

  return (
    <MUITab
      className=''
      {...rest}
      ref={ref}
      tabIndex={0}
      disabled={disabled}
      label={labelComponent}
      icon={icon}
      value={value}
      selected={selected}
      onChange={onChange}
      onClick={onClick}
      classes={{
        root: classes[orientation],
        selected: classes.selected,
        wrapper: classes.wrapper,
      }}
    />
  )
})

Tab.displayName = 'Tab'

type GetLabelComponentProps = {
  avatar?: string | null
  description?: string
  disabled?: boolean
  label?: React.ReactNode
  orientation: 'horizontal' | 'vertical'
  titleCase?: boolean
}
const getLabelComponent = ({
  avatar,
  description,
  disabled,
  label,
  orientation,
  titleCase,
}: GetLabelComponentProps): React.ReactNode => {
  if (!label) {
    return null
  }

  const isHorizontal = orientation === 'horizontal'
  const isCustomLabel = typeof label !== 'string'

  const Label = () => (
    <TabLabel titleCase={titleCase} label={label} orientation={orientation} />
  )

  if (isHorizontal || isCustomLabel) {
    return <Label />
  }

  if (typeof avatar === 'undefined') {
    return (
      <>
        <Label />
        {description && (
          <TabDescription disabled={disabled}>{description}</TabDescription>
        )}
      </>
    )
  }

  return (
    <UserBadge renderName={Label} name={label} avatar={avatar}>
      {description && (
        <TabDescription disabled={disabled}>{description}</TabDescription>
      )}
    </UserBadge>
  )
}

export default Tab
