import React, { Fragment } from 'react'
import { Page, Link } from '@toptal/picasso'
import styled from 'styled-components'
import { screens } from '@toptal/picasso/utils'

const StyledLink = styled(Link)`
  margin-left: 2.5em;

  ${screens('small')} {
    margin-left: 0;
    margin-bottom: 0.5em;
  }
`

const FooterRightContentExample = () => (
  <div>
    <Page.Footer rightContent={<Links />} />
  </div>
)

const Links = () => (
  <Fragment>
    <StyledLink href='#' underline='none' invert>
      +1.888.604.3188
    </StyledLink>

    <StyledLink href='#' underline='none' invert>
      Contact Us
    </StyledLink>

    <StyledLink href='#' underline='none' invert>
      Privacy Policy
    </StyledLink>

    <StyledLink href='#' underline='none' invert>
      Portal Agreement
    </StyledLink>

    <StyledLink href='#' underline='none' invert>
      Toptal Training
    </StyledLink>
  </Fragment>
)

export default FooterRightContentExample
