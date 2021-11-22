import { makeStyles, createStyles } from '@material-ui/core'

type MakeStyles = typeof makeStyles
type StylesParam = Parameters<MakeStyles>[0]
type Options = Parameters<MakeStyles>[1]

const createStylesHook = (
  styles: StylesParam,
  options: Options
): ReturnType<MakeStyles> => {
  return makeStyles(
    theme =>
      createStyles(typeof styles === 'function' ? styles(theme) : styles),
    options
  )
}

export { createStylesHook }
