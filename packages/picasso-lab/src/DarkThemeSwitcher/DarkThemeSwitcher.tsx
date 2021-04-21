import React, { ButtonHTMLAttributes, forwardRef } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import {
  BaseProps,
  TextLabelProps,
  CompoundedComponentWithRef
} from '@toptal/picasso-shared'
import { Afternoon16, Night16 } from '@toptal/picasso'
import cx from 'classnames'

import Switch from '../Switch'
import styles from './styles'

type VariantType = 'dark' | 'light'

export interface Props
  extends BaseProps,
    TextLabelProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  /** State of the switcher */
  checked: boolean
  /** Color variant */
  variant?: VariantType
  /** Callback invoked when component is clicked */
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoDarkThemeSwitcher'
})

// eslint-disable-next-line react/display-name
export const DarkThemeSwitcher = forwardRef<HTMLDivElement, Props>(
  function DarkThemeSwitcher (props) {
    const classes = useStyles()
    const { checked, onChange, variant = checked ? 'dark' : 'light' } = props

    return (
      <div className={classes.wrapper}>
        <div className={cx(classes.iconSun, classes[variant])}>
          <Afternoon16 />
        </div>
        <Switch checked={checked} onChange={onChange} />
        <div className={cx(classes.iconMoon, classes[variant])}>
          <Night16 />
        </div>
      </div>
    )
  }
) as CompoundedComponentWithRef<Props, HTMLDivElement>

DarkThemeSwitcher.displayName = 'DarkThemeSwitcher'

export default DarkThemeSwitcher
