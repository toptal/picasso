import { Theme } from '@material-ui/core/styles'
declare const _default: ({
  palette,
  sizes,
  transitions
}: Theme) => Record<
  'head' | 'root' | 'hover' | 'stripeEven',
  | import('@material-ui/styles').CSSProperties
  | (() => import('@material-ui/styles').CSSProperties)
>
export default _default
