type PIndex = { [index: string]: any }

export default <P extends object>(
  props: P,
  featureProps: Partial<P>,
  unsupportedProps: Partial<P>,
  componentName: string
) => {
  const featurePropNames = Object.keys(featureProps)

  if (
    featurePropNames.every(
      propName =>
        (props as PIndex)[propName] !== (featureProps as PIndex)[propName]
    )
  ) {
    return props
  }

  const unsupportedPropNames = Object.keys(unsupportedProps)

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
