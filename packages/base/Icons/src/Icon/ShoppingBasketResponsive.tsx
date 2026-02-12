import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import ShoppingBasket16 from './ShoppingBasket16'
import ShoppingBasket24 from './ShoppingBasket24'
import type { Props } from './ShoppingBasket16'

const ShoppingBasketResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <ShoppingBasket16 {...props} />,
    },
    <ShoppingBasket24 {...props} />
  ) as JSX.Element
}

export default ShoppingBasketResponsive
