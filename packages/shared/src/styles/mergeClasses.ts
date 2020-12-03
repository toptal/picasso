import cx from 'classnames'

export default <
  T1 extends Record<string, string>,
  T2 extends Record<string, string>
>(
  classes: T1,
  externalClasses?: T2
): T1 =>
  Object.keys(classes).reduce(
    (acc, className) => ({
      ...acc,
      [className]: cx(
        acc[className],
        externalClasses ? externalClasses[className] : undefined
      )
    }),
    classes
  )
