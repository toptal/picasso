import React from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import IconsLibrary from './IconsLibrary'
import styles from './styles'
import { Classes } from '../styles/types'

interface Props {
  /** Name of the icon from a registered `IconsLibrary` */
  name: string
  classes: Classes
  /** Extra css classes to be passed to `Icon` */
  className?: string
}

const SVG_PREFIX = 'Svg'
const capitalizeFirstLetter = (str: string): string =>
  str.charAt(0).toUpperCase() + str.substring(1)

export const decapitalizeFirstLetter = (str: string): string =>
  str.charAt(0).toLowerCase() + str.substring(1)

export const Icon: React.FunctionComponent<Props> = props => {
  const { name, classes, className, ...rest } = props
  const iconComponentName = SVG_PREFIX + capitalizeFirstLetter(name)
  const IconComponent = IconsLibrary.listOfImportedIcons[iconComponentName]

  // @ts-ignore
  return <IconComponent {...rest} className={cx(className, classes.root)} />
}

export default withStyles(styles)(Icon)
