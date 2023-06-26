import type { ToolbarStateType } from './types'

const initialState: ToolbarStateType = {
  format: {
    bold: false,
    header: '',
    italic: false,
    list: false,
    link: '',
  },
  disabled: true,
}

export default initialState
