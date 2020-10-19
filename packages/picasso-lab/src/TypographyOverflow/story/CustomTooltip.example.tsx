import React from 'react'
import { TypographyOverflow } from '@toptal/picasso-lab'

const Example = () => {
  const someHtmlFromServer =
    'This <b>typography</b> is very long and therefore it overflows.'

  return (
    <div style={{ width: 300, marginTop: 220 }}>
      <TypographyOverflow
        data-testid='ellipsed-text'
        tooltipContent={
          <p
            dangerouslySetInnerHTML={{
              __html: someHtmlFromServer
            }}
          />
        }
        dangerouslySetInnerHTML={{
          __html: someHtmlFromServer
        }}
      />
    </div>
  )
}

export default Example
