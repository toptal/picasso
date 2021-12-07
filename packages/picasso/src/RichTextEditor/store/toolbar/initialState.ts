import { ToolbarStateType } from './types'

const initialState: ToolbarStateType = {
  format: {
    bold: false,
    header: '',
    italic: false,
    list: false
  },
  disabled: true
}

export default initialState
