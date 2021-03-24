import React from 'react'

import unsafeErrorLog from './unsafe-error-log'

interface UseDeprecationWarningArgs {
  description?: string
  name: string
  newName?: string
}

const useDeprecationWarning = ({
  description,
  name,
  newName
}: UseDeprecationWarningArgs) => {
  const message =
    `'${name}' component is deprecated and will be removed in the next major release of Picasso.'` +
    `${newName ? ` Please use '${newName}' instead.` : ''}` +
    `${description ? `\n${description}` : ''}`

  React.useEffect(() => {
    unsafeErrorLog(message)
  }, [message])
}

interface UsePropDeprecationWarningArgs<P> {
  props: P
  componentName: string
  description?: string
  name: string
  newName?: string
}

const usePropDeprecationWarning = <P>({
  props,
  componentName,
  description,
  name,
  newName
}: UsePropDeprecationWarningArgs<P>) => {
  const message =
    `${componentName}'s '${name}' prop is deprecated and will be removed in the next major release of Picasso.` +
    `${newName ? ` Please use '${newName}' instead.` : ''}` +
    `${description ? `\n${description}` : ''}`

  const isDeprecatedPropUsed = name in props

  React.useEffect(() => {
    if (isDeprecatedPropUsed) {
      unsafeErrorLog(message)
    }
  }, [isDeprecatedPropUsed, message])
}

export { useDeprecationWarning, usePropDeprecationWarning }
