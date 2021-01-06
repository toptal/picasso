import React, { forwardRef, useState } from 'react'
import { Theme, makeStyles } from '@material-ui/core/styles'
import cx from 'classnames'
import {
  useAppConfig,
  EnvironmentType,
  StandardProps
} from '@toptal/picasso-shared'

import styles from './styles'

export type EnvironmentTypes = EnvironmentType<'temploy' | 'test'>

export interface Props extends StandardProps {
  /** Name of the current environment */
  environment: EnvironmentTypes
  /** Name of the product to be rendered alongside environment (i.e. Blackfish, Talent, Portal, Billing) */
  productName: string
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoEnvironmentBanner'
})

export const EnvironmentBanner = forwardRef<HTMLDivElement, Props>(
  function EnvironmentBanner(props, ref) {
    const { environment: configEnvironment } = useAppConfig()
    const { environment, productName } = props
    const classes = useStyles()

    const [isShown, setIsShown] = useState(true)

    const resolvedEnvironment = environment || configEnvironment

    if (
      resolvedEnvironment === 'production' ||
      resolvedEnvironment === 'test' ||
      !isShown
    ) {
      return null
    }

    return (
      <div
        ref={ref}
        className={cx(classes.root, {
          [classes.rootDevelopment]: resolvedEnvironment === 'development',
          [classes.rootTemploy]: resolvedEnvironment === 'temploy',
          [classes.rootStaging]: resolvedEnvironment === 'staging'
        })}
      >
        <div
          onClick={() => setIsShown(false)}
          className={cx(classes.label, {
            [classes.labelDevelopment]: resolvedEnvironment === 'development',
            [classes.labelTemploy]: resolvedEnvironment === 'temploy',
            [classes.labelStaging]: resolvedEnvironment === 'staging'
          })}
        >
          {`${productName} ${resolvedEnvironment}`}
        </div>
      </div>
    )
  }
)

// TODO: remove default environment in v5, so either directly passed version will be used
// or one from config, but not from defaultProps
EnvironmentBanner.defaultProps = { environment: 'production' }

EnvironmentBanner.displayName = 'EnvironmentBanner'

export default EnvironmentBanner
