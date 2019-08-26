import React from 'react'
import { Link, LinkProps, MemoryRouter as Router, NavLinkProps } from 'react-router-dom'
import { Link as PicassoLink } from '@toptal/picasso'
import { Omit } from '@material-ui/types'

// The usage of React.forwardRef will no longer be required for react-router-dom v6.
// see https://github.com/ReactTraining/react-router/issues/6056
const AdapterLink = (props: LinkProps) => (
  <Link {...props} />
)

// ComponentPropsWithRef<typeof PicassoLink>

const LinkWrapper = (props: NavLinkProps & {}) => {

}

interface OverridableTypeMap {
  props: {};
  defaultComponent: React.ElementType;
  classKey: string;
}

interface OverridableComponent<M extends OverridableTypeMap> {
  <C extends React.ElementType>(props: { component: C } & OverrideProps<M, C>): JSX.Element;
  (props: DefaultComponentProps<M>): JSX.Element;
}

/**
 * Props if `component={Component}` is NOT used.
 */
// prettier-ignore
export type DefaultComponentProps<M extends OverridableTypeMap> =
  & BaseProps<M>
  & Omit<React.ComponentPropsWithRef<M['defaultComponent']>, keyof BaseProps<M>>;

type OverrideProps<
  M extends OverridableTypeMap,
  C extends React.ElementType
> = (
  & BaseProps<M>
  & Omit<React.ComponentPropsWithRef<C>, keyof CommonProps<M>>
);

/**
 * Props defined on the component (+ common material-ui props).
 */
// prettier-ignore
export type BaseProps<M extends OverridableTypeMap> =
  & M['props']
  & CommonProps<M>;

/**
 * Props that are valid for material-ui components.
 */
export interface CommonProps<M extends OverridableTypeMap> {
className?: string;
style?: React.CSSProperties;
}

export default function ButtonRouter() {
  return (
    <Router>
      <PicassoLink as={AdapterLink} to='/'>
        Simple case
      </PicassoLink>
    </Router>
  )
}
