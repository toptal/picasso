import React from 'react'
import { Page, Link } from '@toptal/picasso'
import styled from 'styled-components'
import { screens } from '@toptal/picasso/utils'

const StyledLink = styled(Link)`
  margin-left: 2.5rem;

  ${screens('small')} {
    margin-left: 0;
    margin-bottom: 0.5rem;
  }
`

const Example = () => (
  <div>
    <Page.Footer rightContent={<Links />} />
  </div>
)

const Links = () => (
  <>
    <StyledLink href='#' color='white'>
      +1.888.867.7001
    </StyledLink>

    <StyledLink href='#' color='white'>
      Contact Us
    </StyledLink>

    <StyledLink href='#' color='white'>
      Privacy Policy
    </StyledLink>

    <StyledLink href='#' color='white'>
      Portal Agreement
    </StyledLink>

    <StyledLink href='#' color='white'>
      Toptal Training
    </StyledLink>
  </>
)

export default Example
