import { Theme } from '@material-ui/core/styles'
import '../Chip/styles'
declare const _default: ({
  palette
}: Theme) => Record<
  'white' | 'disabled' | 'root' | 'deleteIcon' | 'innerLabel',
  | import('@material-ui/styles').CSSProperties
  | (() => import('@material-ui/styles').CSSProperties)
>
export default _default
