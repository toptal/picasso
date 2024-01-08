import unsafeErrorLog from './unsafe-error-log'

type PIndex = { [index: string]: unknown }

export type FeatureOptions<P extends object> = {
  featureProps: Partial<P>
  unsupportedProps: Partial<P>
}

export default <P extends object>(
  componentName: string,
  props: P,
  options: FeatureOptions<P>
) => {
  const { featureProps, unsupportedProps } = options

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
    unsafeErrorLog(
      `${componentName} doesn't support: ${unsupportedPropNames.join(
        ', '
      )} props when used with ${JSON.stringify(featureProps)}`
    )

    return { ...props, ...unsupportedProps }
  }

  return props
}
