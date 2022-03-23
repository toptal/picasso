import React from 'react'
import { render, screen } from '@toptal/picasso/test-utils'

import WelcomePage, { TestId } from './WelcomePage'
import packageJson from '../../../../../package.json'


jest.mock('../../components', () => ({
  __esModule: true,
  CountriesList: () => null
}))


const expectParagraphWithLinkIsFound = (text: string, link: string) => {
  const paragraph = screen.queryByText(
    (_, element) => element.textContent === text
  )
  expect(paragraph.querySelector(':scope > a')).toHaveProperty('href', link)
}

describe('WelcomePage', () => {
  it('shows the correct content', () => {
    render(<WelcomePage />)

    const image = screen.queryByTestId(TestId.Image)
    expect(image.src).toBe(
      'https://media.giphy.com/media/Ln2dAW9oycjgmTpjX9/giphy.gif'
    )

    expect(
      screen.queryByText(`Welcome to ${packageJson.name} project`)
    ).not.toBeNull()

    expectParagraphWithLinkIsFound(
      'Toptal has a plenty of recommendations for the new projects on setup. Check the docs.',
      'https://toptal-core.atlassian.net/wiki/spaces/ENG/pages/1120831396/How+to+start+a+new+application'
    )

    expectParagraphWithLinkIsFound(
      'In order to share knowledge across different Toptal teams, there are recommendations provided for various aspects of frontend application development. Check them.',
      'https://toptal-core.atlassian.net/wiki/spaces/ENG/pages/1211334831/Frontend+Architecture+Guidelines'
    )

    expectParagraphWithLinkIsFound(
      'Toptal uses the company component library - Picasso. Check the docs and start creating!',
      'https://picasso.toptal.net/'
    )
  })
})
