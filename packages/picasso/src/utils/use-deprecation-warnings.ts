import React from 'react'

const useDeprecationWarning = (oldName: string, newName?: string) => {
  const message = `
      '${oldName}' component is deprecated and will be removed in the next major release of Picasso.
      ${newName ? ` Please use '${newName}' instead.` : ''}
    `.trim()

  React.useEffect(() => {
    window.console.warn(message)
  }, [message])
}

const usePropDeprecationWarning = <P>(
  props: P,
  oldName: string,
  newName?: string
) => {
  const message = `
    Prop '${oldName}' is deprecated and will be removed in the next major release of Picasso.
    ${newName ? ` Please use '${newName}' instead.` : ''}
  `.trim()
  const isDeprecatedPropUsed = oldName in props

  React.useEffect(() => {
    if (isDeprecatedPropUsed) {
      window.console.warn(message)
    }
  }, [isDeprecatedPropUsed, message])
}

export { useDeprecationWarning, usePropDeprecationWarning }
