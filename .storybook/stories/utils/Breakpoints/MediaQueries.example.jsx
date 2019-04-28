import React from 'react'
import { screens, palette } from '@toptal/picasso'

const MediaQueriesExample = () => (
  <div>
    <style
      dangerouslySetInnerHTML={{
        __html: `
      .box-class {
        background-color: ${palette.success.main};
        padding: 2em;
      }

      ${screens('small', 'medium')} {
        .box-class {
          background-color: ${palette.primary.main};
        }
      }
    `
      }}
    />

    <div className='box-class'>
      Box will become blue on small and medium devices
    </div>
  </div>
)

export default MediaQueriesExample
