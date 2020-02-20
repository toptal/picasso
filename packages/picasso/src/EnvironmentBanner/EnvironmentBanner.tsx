import React, { forwardRef, useState } from 'react'
import { withStyles } from '@material-ui/core/styles'
import cx from 'classnames'
import { StandardProps, useAppConfig } from '@toptal/picasso-shared'

import styles from './styles'

export interface Props extends StandardProps {
  /** Name of the current environment */
  environment: 'development' | 'staging' | 'temploy' | 'production'
  /** Name of the product to be rendered alongside enviroment (i.e. Blackfish, Talent, Portal, Billing) */
  productName: string
}

export const EnvironmentBanner = forwardRef<HTMLDivElement, Props>(
  function EnvironmentBanner({ classes, environment, productName }, ref) {
    const [isShown, setIsShown] = useState(true)
    const { environment: configEnvironment } = useAppConfig()

    const resolvedEnvironment = environment || configEnvironment

    if (resolvedEnvironment === 'production' || !isShown) {
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

export default withStyles(styles)(EnvironmentBanner)
