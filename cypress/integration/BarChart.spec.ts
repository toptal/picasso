// TODO: Make types for function parameters to work
// @ts-ignore
const getBar = name => cy.get(`path[name="${name}"]`).first()
// @ts-ignore
const hoverBar = name =>
  getBar(name)
    .first()
    .trigger('mouseover')
// @ts-ignore
const tooltipShouldContain = text => {
  cy.get('.recharts-default-tooltip')
    .should('be.visible')
    .and('contain', text)
}
// @ts-ignore
const customTooltipShouldContain = text => {
  cy.get('[data-testid="tooltip"]')
    .should('be.visible')
    .and('contain', text)
}

describe('BarChart', () => {
  it('shows default tooltip on hover', () => {
    cy.visit('iframe.html?id=barchart--tooltip')

    hoverBar('Apple')
    tooltipShouldContain('Appleengineers hired : 500')

    hoverBar('Google')
    tooltipShouldContain('Googleengineers hired : 700')

    hoverBar('Facebook')
    tooltipShouldContain('Facebookengineers hired : 600')

    hoverBar('Amazon')
    tooltipShouldContain('Amazonengineers hired : 400')

    hoverBar('Toptal')
    tooltipShouldContain('Toptalengineers hired : 1000')
  })

  it('shows custom tooltip on hover', () => {
    cy.visit('iframe.html?id=barchart--customized')

    hoverBar('Berlin')
    customTooltipShouldContain('Infected: 4000Recovered: 2400')

    hoverBar('Milan')
    customTooltipShouldContain('Infected: 3000Recovered: 1398')

    hoverBar('Moscow')
    customTooltipShouldContain('Infected: 2000Recovered: 9800')

    hoverBar('Los-Angeles')
    customTooltipShouldContain('Infected: 2780Recovered: 3908')
  })
})
