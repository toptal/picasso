import React, { FunctionComponent, FormEventHandler, ReactNode } from 'react'

import FormField from '../FormField'
import FormHint from '../FormHint'
import { BaseProps } from '../Picasso'

interface Props extends BaseProps {
  /** Content of Form constructed of Form elements */
  children?: ReactNode
  /** Submit handler */
  onSubmit?: FormEventHandler<HTMLFormElement>
}

interface StaticProps {
  Field: typeof FormField
  Hint: typeof FormHint
}

export const Form: FunctionComponent<Props> & StaticProps = ({
  onSubmit,
  className,
  style,
  children
}) => (
  <form onSubmit={onSubmit} className={className} style={style}>
    {children}
  </form>
)

Form.Field = FormField

Form.Hint = FormHint

Form.displayName = 'Form'

export default Form
