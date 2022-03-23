import React from 'react'
import Picasso from '@toptal/picasso-provider'

import { WelcomePage } from './modules/welcome'

const App = () => (
  <Picasso>
    <WelcomePage />
  </Picasso>
)

export default App
