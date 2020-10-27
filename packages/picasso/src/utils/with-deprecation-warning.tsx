import React, { ComponentType } from 'react'

const withDeprecationWarning = (oldName: string, newName?: string) =>
  function withDeprecationWarningInner<T>(
    NewComponent: ComponentType<T>
  ): ComponentType<T> {
    const ResultComponent = (props: T) => {
      React.useEffect(() => {
        window.console.warn(
          `
          '${oldName}' component is deprecated and will be
          removed in the next major release of Picasso.
          Please use '${newName}' instead.
                    `.trim()
        )
      }, [])

      // eslint-disable-next-line react/jsx-props-no-spreading
      return <NewComponent {...props} />
    }

    return ResultComponent
  }

withDeprecationWarning.displayName = 'withDepractionWarning'

export default withDeprecationWarning
