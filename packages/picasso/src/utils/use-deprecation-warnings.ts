import React from 'react'

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
    console.warn(message)
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
      console.warn(message)
    }
  }, [isDeprecatedPropUsed, message])
}

export { useDeprecationWarning, usePropDeprecationWarning }
