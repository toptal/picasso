import React from 'react'

interface SourceRenderProps {
  /** A config for Babel. */
  babelConfig?: object

  /**
   * A function that allows to customize you rendering of an result element, i.e wrap with a
   * Provider.
   *
   * @param {React.Element} A created element.
   */
  wrap?: (component: React.ReactNode) => React.ReactNode

  /**
   * An option that controls rendering of HTML with ReactDOM server, it allows to omit
   * rendering when you're using portals.
   */
  renderHtml?: boolean

  /**
   * A function for the imports resolution.
   *
   * @param {String} importPath
   */
  resolver: (lib: string) => object

  /** An object that will be passed additionally to resolver function. */
  resolverContext?: object

  /** A string that contains the source code. */
  source: string

  /**
   * Fixes hot reload issue to reload the component even
   * if source code has not been changed
   * */
  unstable_hot?: boolean
}

interface SourceRenderComponent<T> extends React.ComponentClass<T> {
  Consumer: React.ComponentType
}

export interface RenderResult {
  element: React.ReactNode
  error: object
}

declare const SourceRender: SourceRenderComponent<SourceRenderProps>

export default SourceRender
