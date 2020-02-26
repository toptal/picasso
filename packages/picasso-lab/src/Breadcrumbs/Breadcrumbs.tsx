import React, { FunctionComponent } from 'react'
import { Link as RouterLink } from 'react-router-dom'
// import { Theme, makeStyles } from '@material-ui/core/styles'
import { BaseProps } from '@toptal/picasso-shared'
import { Link, Typography } from '@toptal/picasso'
import { ChevronRight16 } from '@toptal/picasso/Icon'
import { Breadcrumbs as MuiBreadcrumbs } from '@material-ui/core'

// import styles from './styles'

export interface Props extends BaseProps {}

// const useStyles = makeStyles<Theme, Props>(styles, {
//   name: 'PicassoBreadcrumbs'
// })

const Active = ({ children }) => {
  return (
    <Typography weight='semibold' color='black'>
      {children}
    </Typography>
  )
}

const PicassoRouterLink = ({ children, to }) => {
  return (
    <Link as={RouterLink} to={to}>
      {children}
    </Link>
  )
}

const PicassoLink = ({ children, href }) => {
  return <Link href={href}>{children}</Link>
}

const Breadcrumbs: FunctionComponent<Props> = props => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <MuiBreadcrumbs {...props} separator={<ChevronRight16 />} />
}

Breadcrumbs.displayName = 'Breadcrumbs'

Breadcrumbs.Active = Active
Breadcrumbs.RouterLink = PicassoRouterLink
Breadcrumbs.Link = PicassoLink

export default Breadcrumbs
