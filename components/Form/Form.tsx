import React, { FunctionComponent } from 'react'

import FormField from '../FormField'
import FormHint from '../FormHint'

type Props = React.DetailedHTMLProps<
  React.FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
>

interface StaticProps {
  Field: typeof FormField
  Hint: typeof FormHint
}

const Form: FunctionComponent<Props> & StaticProps = props => (
  <form {...props} />
)

Form.Field = FormField

Form.Hint = FormHint

Form.displayName = 'Form'

export default Form
