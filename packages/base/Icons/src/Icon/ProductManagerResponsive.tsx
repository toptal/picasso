import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import ProductManager16 from './ProductManager16'
import ProductManager24 from './ProductManager24'
import type { Props } from './ProductManager16'

const ProductManagerResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <ProductManager16 {...props} />,
    },
    <ProductManager24 {...props} />
  ) as JSX.Element
}

export default ProductManagerResponsive
