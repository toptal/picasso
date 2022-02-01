import { ToolbarStateType } from './types'

const initialState: ToolbarStateType = {
  format: {
    bold: false,
    header: '',
    italic: false,
    list: false
  },
  handlers: {
    handleBold: undefined,
    handleItalic: undefined,
    handleHeader: undefined,
    handleOrdered: undefined,
    handleUnordered: undefined
  },
  disabled: true
}

export default initialState
