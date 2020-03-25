import React from 'react'
import { Checkbox, Radio, Grid } from '@toptal/picasso'
import { TypographyOverflow } from '@toptal/picasso-lab'

const checkboxOptions = [
  { label: 'Inbound sales', value: 'inbound_sales' },
  { label: 'Legal', value: 'legal' },
  {
    label: 'VIP talent screening',
    value: 'vip_talent_screening'
  },
  { label: 'English screening', value: 'engish_screening' },
  { label: 'Designer screening', value: 'designer_screening' },
  {
    label: 'Technical screening',
    value: 'technical_screening'
  }
]

const radioOptions = [
  { label: 'Recruiting', value: 'recruiting' },
  { label: 'Customer service', value: 'customer_service' },
  { label: 'Staff', value: 'staff' },
  {
    label: 'Accounts receivable',
    value: 'accounts_receivable'
  },
  { label: 'Accounts payable', value: 'accounts_payable' },
  { label: 'Sourcing', value: 'sourcing' }
]

const Example = () => {
  return (
    <div style={{ width: '660px' }}>
      <Grid spacing={16}>
        <Grid.Item small={12}>
          <Grid>
            {checkboxOptions.map(({ label: optionLabel, value }) => (
              <Grid.Item key={value} small={2} large={2}>
                <Checkbox
                  label={<TypographyOverflow>{optionLabel}</TypographyOverflow>}
                  value={value}
                />
              </Grid.Item>
            ))}
          </Grid>

          <Grid>
            {radioOptions.map(({ label: optionLabel, value }) => (
              <Grid.Item key={value} small={2} large={2}>
                <Radio
                  label={<TypographyOverflow>{optionLabel}</TypographyOverflow>}
                  value={value}
                />
              </Grid.Item>
            ))}
          </Grid>
        </Grid.Item>
      </Grid>
    </div>
  )
}

export default Example
