import React, { ReactNode, LiHTMLAttributes } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import cx from 'classnames'
import { BaseProps, SizeType } from '@toptal/picasso-shared'
import capitalize from '@material-ui/core/utils/capitalize'

// import ListItem from '@material-ui/core/ListItem'
import styles from './styles'

interface Props extends BaseProps, LiHTMLAttributes<HTMLLIElement> {
  children?: ReactNode
  selected?: boolean

  /**
   * Size of component
   */
  size?: SizeType<'small' | 'medium'>
}

const useStyles = makeStyles<Theme, Props>(styles, {
  name: 'PicassoSelectOption'
})

const SelectOption = (props: Props) => {
  const { selected, size, style, ...rest } = props
  let { children } = props
  const classes = useStyles(props)

  console.log(classes)

  if (typeof children === 'string') {
    children = (
      <span
        className={cx(classes.stringContent, {
          [classes[`stringContent${size && capitalize(size!)}`]]: size
        })}
        style={style}
      >
        {children}
      </span>
    )
  }

  return (
    <li
      className={cx(classes.root, {
        [classes.selected]: selected,
        [classes[`gutters${size && capitalize(size!)}`]]: size
      })}
      {...rest}
    >
      {children}
    </li>
  )
}

export default SelectOption
