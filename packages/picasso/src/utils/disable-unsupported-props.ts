type PIndex = { [index: string]: unknown }

export default <P extends object>(
  props: P,
  featureProps: Partial<P>,
  unsupportedProps: Partial<P>,
  componentName: string
) => {
  const featurePropNames = Object.keys(featureProps)

  // Check if in props there are props with same value as feature props, if
  // so it will mean we need to check further for unsupported props and reset them
  if (
    featurePropNames.every(
      propName =>
        (props as PIndex)[propName] !== (featureProps as PIndex)[propName]
    )
  ) {
    return props
  }

  const unsupportedPropNames = Object.keys(unsupportedProps)

  // Check for unsupported props if there are props that are enabled, if so
  // warn developer in console and reset props to turn off unsupported props
  if (unsupportedPropNames.some(propName => (props as PIndex)[propName])) {
    console.warn(
      `${componentName} doesn't support: ${unsupportedPropNames.join(
        ', '
      )} props when used with ${JSON.stringify(featureProps)}`
    )

    return { ...props, ...unsupportedProps }
  }

  return props
}
