import React, { FunctionComponent } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Theme, makeStyles } from '@material-ui/core/styles'
import { BaseProps } from '@toptal/picasso-shared'
import { Link } from '@toptal/picasso'
import { ChevronRight16 } from '@toptal/picasso/Icon'
import cx from 'classnames'

import styles from './styles'

interface Item {
  text: string
  href: string
}

export interface Props extends BaseProps {
  /** Items representing breadcrumbs. */
  items: Item[]
  /** Index of the active item. Defaults to the last item in items. */
  active?: number
}

const useStyles = makeStyles<Theme, Props>(styles, {
  name: 'PicassoBreadcrumbs'
})

const Breadcrumbs: FunctionComponent<Props> = props => {
  const classes = useStyles(props)
  const { items, active = items.length - 1 } = props

  if (!items.length) {
    return null
  }

  return (
    <nav aria-label='breadcrumb' className={classes.root}>
      <ol className={classes.breadcrumbs}>
        {items.map((item, itemIndex) => (
          <React.Fragment key={itemIndex}>
            <li className={classes.item}>
              {active === itemIndex ? (
                item.text
              ) : (
                <Link as={RouterLink} to={item.href}>
                  {item.text}
                </Link>
              )}
            </li>

            {itemIndex !== items.length - 1 && (
              <li className={cx(classes.item, classes.splitter)}>
                <ChevronRight16 />
              </li>
            )}
          </React.Fragment>
        ))}
      </ol>
    </nav>
  )
}

Breadcrumbs.displayName = 'Breadcrumbs'

export default Breadcrumbs
