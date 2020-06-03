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
    <StyledLink href='#' underline='none' color='white'>
      +1.888.604.3188
    </StyledLink>

    <StyledLink href='#' underline='none' color='white'>
      Contact Us
    </StyledLink>

    <StyledLink href='#' underline='none' color='white'>
      Privacy Policy
    </StyledLink>

    <StyledLink href='#' underline='none' color='white'>
      Portal Agreement
    </StyledLink>

    <StyledLink href='#' underline='none' color='white'>
      Toptal Training
    </StyledLink>
  </>
)

export default Example
