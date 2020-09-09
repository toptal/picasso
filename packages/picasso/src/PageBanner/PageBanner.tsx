import React, {
  ReactNode,
  forwardRef,
  HTMLAttributes,
  ReactElement,
  useContext,
  FunctionComponent
} from 'react'
import { Theme, makeStyles } from '@material-ui/core/styles'
import cx from 'classnames'
import { BaseProps, CompoundedComponentWithRef } from '@toptal/picasso-shared'

import Container, { VariantType } from '../Container'
import styles from './styles'
import { PageContextProps } from '../Page/types'
import { PageContext } from '../Page/Page'

export interface Props extends BaseProps, HTMLAttributes<HTMLDivElement> {
  /** Children components */
  children: ReactNode
  /** Color variant of Banner */
  variant?: VariantType
  /** Add <Icon /> before Banner content  */
  icon?: ReactElement
}

export interface StaticProps {
  Message: FunctionComponent
  Actions: FunctionComponent
}

const useStyles = makeStyles<Theme, Props>(styles, {
  name: 'PicassoPageBanner'
})

const useActionStyles = makeStyles<Theme>(styles, {
  name: 'PicassoPageBannerActions'
})

const Message: FunctionComponent = ({ children }) => <div>{children}</div>
const Actions: FunctionComponent = props => {
  const classes = useActionStyles(props)

  return <div className={classes.actions}>{props.children}</div>
}

export const PageBanner = forwardRef<HTMLDivElement, Props>(function PageBanner(
  props,
  ref
) {
  const { className, style, children, variant, icon, ...rest } = props
  const classes = useStyles(props)
  const { width, fullWidth } = useContext<PageContextProps>(PageContext)

  const innerClassName = cx(
    {
      [classes.fullWidth]: fullWidth || width === 'full',
      [classes.wide]: width === 'wide'
    },
    classes.content
  )

  return (
    <Container
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      ref={ref}
      className={cx(classes.root, className)}
      style={style}
      variant={variant}
      flex
    >
      <Container variant={variant} className={innerClassName} flex>
        {icon && (
          <Container flex alignItems='center' className={classes.iconWrapper}>
            {icon}
          </Container>
        )}
        <Container className={classes.main}>{children}</Container>
      </Container>
    </Container>
  )
}) as CompoundedComponentWithRef<Props, HTMLElement, StaticProps>

PageBanner.defaultProps = {
  variant: 'yellow'
}

PageBanner.displayName = 'PageBanner'

PageBanner.Message = Message
PageBanner.Actions = Actions

export default PageBanner
