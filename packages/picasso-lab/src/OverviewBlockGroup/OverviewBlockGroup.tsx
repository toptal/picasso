import React, { FunctionComponent, HTMLAttributes } from 'react'
import { Theme, makeStyles } from '@material-ui/core/styles'
import cx from 'classnames'

import styles from './styles'

type Props = HTMLAttributes<HTMLDivElement>

const useStyles = makeStyles<Theme, Props>(styles, {
  name: 'PicassoOverviewBlockGroup'
})

const OverviewBlockGroup: FunctionComponent<Props> = props => {
  const { className, children, ...rest } = props
  const classes = useStyles(props)

  return (
    <section
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      className={cx(classes.root, className)}
    >
      {React.Children.map(children, child => {
        if (!React.isValidElement(child)) {
          return child
        }
        return React.cloneElement(child, {
          className: cx(child.props.className, classes.block)
        })
      })}
    </section>
  )
}

OverviewBlockGroup.displayName = 'OverviewBlockGroup'

export default OverviewBlockGroup
