import React from 'react'

declare var NODE_ENV: string

const withDeprecationWarning = (oldName: string, newName?: string) => <
  T extends {}
>(
  NewIcon: React.ComponentType<T>
): React.ComponentType<T> => {
  if (NODE_ENV !== 'test') {
    if (!newName) {
      window.console.warn(
        `'${oldName}' icon is deprecated and will be removed in the next major release of Picasso. Please contact your designer to provide you a correct icon.`
      )
    } else {
      window.console.warn(
        `'${oldName}' icon is deprecated and will be removed in the next major release of Picasso. Please use '${newName}' directly to maintain pixel perfect icons.`
      )
    }
  }
  // eslint-disable-next-line react/jsx-props-no-spreading
  const newIconComponent = (props: T) => <NewIcon {...props} />

  return newIconComponent
}

withDeprecationWarning.displayName = 'withDepractionWarning'

export default withDeprecationWarning
