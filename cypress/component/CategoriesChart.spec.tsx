import React from 'react'
import type { DataItem } from '@topkit/analytics-charts'
import { CategoriesChart } from '@topkit/analytics-charts'

const TestCategoriesChart = () => (
  <div style={{ width: 720 }}>
    <CategoriesChart
      data={chartData as DataItem[]}
      labels={chartLabels}
      tooltips={chartTooltips}
      width='100%'
      isAnimationActive={false}
    />
  </div>
)

const component = 'CategoriesChart'

describe('CategoriesChart', () => {
  it('renders default chart', () => {
    cy.mount(<TestCategoriesChart />)

    // fix flakiness, sometimes the screenshot was taken
    // with mouse over the bar and it triggered tooltip
    cy.get('svg').realClick()
    cy.get('svg').realHover({ position: 'topLeft' })

    cy.get('body').happoScreenshot({
      component,
      variant: 'default',
    })

    cy.get('text').contains('421').realHover({ position: 'center' })
    cy.get('.recharts-tooltip-wrapper').should('be.visible')

    cy.get('body').happoScreenshot({
      component,
      variant: 'default/with-column-hover',
    })
  })
})

const chartData = [
  {
    id: 'claimed',
    values: [
      {
        id: 'team',
        values: [
          {
            id: 'viable',
            value: 252,
          },
          {
            id: 'bad_leads',
            value: 0,
          },
          {
            id: 'rejected',
            value: 11,
          },
        ],
      },
      {
        id: 'user',
        values: [
          {
            id: 'viable',
            value: 595,
          },
          {
            id: 'bad_leads',
            value: 0,
          },
          {
            id: 'rejected',
            value: 24,
          },
        ],
      },
    ],
  },
  {
    id: 'contacted',
    values: [
      {
        id: 'team',
        values: [
          {
            id: 'contacted',
            value: 189,
          },
        ],
      },
      {
        id: 'user',
        values: [
          {
            id: 'contacted',
            value: 421,
          },
        ],
      },
    ],
  },
  {
    id: 'approved',
    values: [
      {
        id: 'team',
        values: [
          {
            id: 'approved',
            value: 29,
          },
        ],
      },
      {
        id: 'user',
        values: [
          {
            id: 'approved',
            value: 27,
          },
        ],
      },
    ],
  },
  {
    id: 'verified',
    values: [
      {
        id: 'team',
        values: [
          {
            id: 'verified',
            value: 22,
          },
        ],
      },
      {
        id: 'user',
        values: [
          {
            id: 'verified',
            value: 21,
          },
        ],
      },
    ],
  },
  {
    id: 'with_deposit',
    values: [
      {
        id: 'team',
        values: [
          {
            id: 'with_deposit',
            value: 16,
          },
        ],
      },
      {
        id: 'user',
        values: [
          {
            id: 'with_deposit',
            value: 17,
          },
        ],
      },
    ],
  },
  {
    id: 'with_active_engagement',
    values: [
      {
        id: 'team',
        values: [
          {
            id: 'with_active_engagement',
            value: 7,
          },
        ],
      },
      {
        id: 'user',
        values: [
          {
            id: 'with_active_engagement',
            value: 5,
          },
        ],
      },
    ],
  },
]

const chartLabels = {
  claimed: 'Claimed',
  contacted: 'Contacted',
  approved: 'Approved',
  verified: 'Verified',
  with_deposit: 'With a Deposit',
  with_active_engagement: 'With an Active Engagement',
}

const chartTooltips = {
  claimed: {
    team: {
      viable: 'Team Viable Average',
      bad_leads: 'Team Bad Leads (Unresponsive) Average',
      rejected: 'Team Removed Average',
    },
    user: {
      viable: 'Your Viable',
      bad_leads: 'Your Bad Leads (Unresponsive)',
      rejected: 'Your Removed',
    },
  },
  contacted: {
    team: {
      contacted: 'Team Contacted Average',
    },
    user: {
      contacted: 'Your Contacted',
    },
  },
  approved: {
    team: {
      approved: 'Team Approved Average',
    },
    user: {
      approved: 'Your Approved',
    },
  },
  verified: {
    team: {
      verified: 'Team Verified Average',
    },
    user: {
      verified: 'Your Verified',
    },
  },
  with_deposit: {
    team: {
      with_deposit: 'Team With a Deposit Average',
    },
    user: {
      with_deposit: 'Your With a Deposit',
    },
  },
  with_active_engagement: {
    team: {
      with_active_engagement: 'Team With an Active Engagement Average',
    },
    user: {
      with_active_engagement: 'Your With an Active Engagement',
    },
  },
}
