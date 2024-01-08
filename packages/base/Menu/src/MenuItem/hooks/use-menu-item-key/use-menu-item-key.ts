import { useState } from 'react'

let count = 0

const useMenuItemKey = () => {
  const [key] = useState(() => String(count++))

  return key
}

export default useMenuItemKey
