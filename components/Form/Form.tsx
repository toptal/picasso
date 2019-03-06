import React from 'react'

import FormField from '../FormField'
import FormHint from '../FormHint'

const Form: React.FunctionComponent = props => <form {...props} />

// @ts-ignore
Form.Field = FormField
// @ts-ignore
Form.Hint = FormHint

export default Form
