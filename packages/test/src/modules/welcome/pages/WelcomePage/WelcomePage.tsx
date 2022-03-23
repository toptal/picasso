import React from 'react'
import { Link, Image } from '@toptal/picasso'

import { Layout } from '../../../core'
import * as Documentation from '../../../documentation'

import { CountriesList } from '../../components'

import packageJson from '../../../../../package.json'

const GIF_URL = 'https://media.giphy.com/media/Ln2dAW9oycjgmTpjX9/giphy.gif'
const TOPTAL_HOW_TO_DOC_URL =
  'https://toptal-core.atlassian.net/wiki/spaces/ENG/pages/1120831396/How+to+start+a+new+application'
const TOPTAL_ARCHITECTURE_GUIDELINES_DOC_URL =
  'https://toptal-core.atlassian.net/wiki/spaces/ENG/pages/1211334831/Frontend+Architecture+Guidelines'
const TOPTAL_PICASSO_URL = 'https://picasso.toptal.net'

export enum TestId {
  Image = 'image'
}

const WelcomePage = () => {
  return (
    <Layout title={packageJson.name}>
      <Documentation.Container bottom='large'>
        <Image
          src={GIF_URL}
          alt="Let's get started"
          data-testid={TestId.Image}
        />
      </Documentation.Container>

      <Documentation.Container>
        <Documentation.Title>
          Welcome to {packageJson.name} project
        </Documentation.Title>
        <Documentation.Paragraph>
          {packageJson.description}
        </Documentation.Paragraph>
      </Documentation.Container>

      <Documentation.Container top='small' bottom='small'>
        <CountriesList />
      </Documentation.Container>

      <Documentation.Title>What&apos;s next?</Documentation.Title>

      <Documentation.Container top='small' bottom='small'>
        <Documentation.Subtitle>
          Read how-to documentation
        </Documentation.Subtitle>
        <Documentation.Paragraph>
          Toptal has a plenty of recommendations for the new projects on setup.{' '}
          <Link href={TOPTAL_HOW_TO_DOC_URL}>Check the docs</Link>.
        </Documentation.Paragraph>
      </Documentation.Container>

      <Documentation.Container bottom='small'>
        <Documentation.Subtitle>
          Learn Architecture Guidelines
        </Documentation.Subtitle>
        <Documentation.Paragraph>
          In order to share knowledge across different Toptal teams, there are
          recommendations provided for various aspects of frontend application
          development.{' '}
          <Link href={TOPTAL_ARCHITECTURE_GUIDELINES_DOC_URL}>Check them</Link>.
        </Documentation.Paragraph>
      </Documentation.Container>

      <Documentation.Container bottom='small'>
        <Documentation.Subtitle>Check Picasso docs</Documentation.Subtitle>
        <Documentation.Paragraph>
          Toptal uses the company component library -{' '}
          <Link href={TOPTAL_PICASSO_URL}>Picasso</Link>. Check the docs and
          start creating!
        </Documentation.Paragraph>
      </Documentation.Container>
    </Layout>
  )
}

WelcomePage.displayName = 'WelcomePage'

export default WelcomePage
