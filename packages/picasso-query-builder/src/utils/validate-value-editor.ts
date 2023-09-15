import type { ValidationResult } from 'react-querybuilder'

const validateValueEditor = ({
  validation,
  touched,
}: {
  validation?: ValidationResult | boolean
  touched?: boolean
}) => {
  if (!touched || validation === undefined || validation === null) {
    return false
  }

  return (
    validation === false ||
    (typeof validation === 'object' && !validation.valid)
  )
}

export default validateValueEditor
