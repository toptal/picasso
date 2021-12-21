import { createContext } from 'react'
import { ModalContextProps } from '@toptal/picasso/Modal/types'

export default createContext<ModalContextProps>({
  isModalVisible: false
})
