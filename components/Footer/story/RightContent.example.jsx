import React from 'react'
import { Footer } from '@toptal/picasso'

const FooterRightContentExample = () => (
  <div>
    <Footer rightContent={<Links />} />
  </div>
)

const Links = () => (
  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    <a
      href='#'
      style={{ textDecoration: 'none', color: 'white', marginLeft: '2.5em' }}
    >
      +1.888.604.3188
    </a>
    <a
      href='#'
      style={{ textDecoration: 'none', color: 'white', marginLeft: '2.5em' }}
    >
      Contact Us
    </a>
    <a
      href='#'
      style={{ textDecoration: 'none', color: 'white', marginLeft: '2.5em' }}
    >
      Privacy Policy
    </a>
    <a
      href='#'
      style={{ textDecoration: 'none', color: 'white', marginLeft: '2.5em' }}
    >
      Portal Agreement
    </a>
    <a
      href='#'
      style={{ textDecoration: 'none', color: 'white', marginLeft: '2.5em' }}
    >
      Toptal Training
    </a>
  </div>
)

export default FooterRightContentExample
