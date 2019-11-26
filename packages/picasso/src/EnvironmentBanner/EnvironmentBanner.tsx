import React, { forwardRef, useState } from 'react'
import { withStyles } from '@material-ui/core/styles'
import cx from 'classnames'
import { StandardProps } from '@toptal/picasso-shared'

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

    if (environment === 'production' || !isShown) {
      return null
    }

    return (
      <div
        ref={ref}
        className={cx(classes.root, {
          [classes.rootDevelopment]: environment === 'development',
          [classes.rootTemploy]: environment === 'temploy',
          [classes.rootStaging]: environment === 'staging'
        })}
      >
        <div
          onClick={() => setIsShown(false)}
          className={cx(classes.label, {
            [classes.labelDevelopment]: environment === 'development',
            [classes.labelTemploy]: environment === 'temploy',
            [classes.labelStaging]: environment === 'staging'
          })}
        >
          {`${productName} ${environment}`}
        </div>
      </div>
    )
  }
)

EnvironmentBanner.defaultProps = { environment: 'production' }

EnvironmentBanner.displayName = 'EnvironmentBanner'

export default withStyles(styles)(EnvironmentBanner)
