// TODO: Make types for function parameters to work
const getBar = (name: string) => cy.get(`path[name="${name}"]`).first()

const hoverOverBar = (name: string) =>
  getBar(name)
    .first()
    .trigger('mouseover')

const assertTooltipContent = (text: string) => {
  cy.get('.recharts-default-tooltip')
    .should('be.visible')
    .and('contain', text)
}

const assertCustomTooltipContent = (text: string) => {
  cy.get('[data-testid="tooltip"]')
    .should('be.visible')
    .and('contain', text)
}

describe('BarChart', () => {
  it('shows default tooltip on hover', () => {
    cy.visit('iframe.html?id=barchart--tooltip')

    hoverOverBar('Apple')
    assertTooltipContent('Appleengineers hired : 500')

    hoverOverBar('Google')
    assertTooltipContent('Googleengineers hired : 700')

    hoverOverBar('Facebook')
    assertTooltipContent('Facebookengineers hired : 600')

    hoverOverBar('Amazon')
    assertTooltipContent('Amazonengineers hired : 400')

    hoverOverBar('Toptal')
    assertTooltipContent('Toptalengineers hired : 1000')
  })

  it('shows custom tooltip on hover', () => {
    cy.visit('iframe.html?id=barchart--customized')

    hoverOverBar('Berlin')
    assertCustomTooltipContent('Infected: 4000Recovered: 2400')

    hoverOverBar('Milan')
    assertCustomTooltipContent('Infected: 3000Recovered: 1398')

    hoverOverBar('Moscow')
    assertCustomTooltipContent('Infected: 2000Recovered: 9800')

    hoverOverBar('Los-Angeles')
    assertCustomTooltipContent('Infected: 2780Recovered: 3908')
  })
})
