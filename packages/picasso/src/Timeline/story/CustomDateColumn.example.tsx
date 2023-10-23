import React from 'react'
import { Timeline, Link, Container, Typography } from '@toptal/picasso'
import { Tasks16 } from '@toptal/picasso/Icon'
const Example = () => (
  <div style={{ maxWidth: 500 }}>
    <Timeline>
      <Timeline.Row
        icon={<Tasks16 />}
        date={
          <Container style={{ minWidth: '200px' }}>
            1:15 PM, Jun 24, 2020
          </Container>
        }
      >
        <Typography>
          System marked job{' '}
          <Link>
            Principal Solutions Product Manager (203875) → Cleo O'Connell
          </Link>{' '}
          as inactive
        </Typography>
      </Timeline.Row>
    </Timeline>
  </div>
)

export default Example

// import React from 'react'
// import { Timeline, Link, Typography } from '@toptal/picasso'
// import { Tasks16 } from '@toptal/picasso/Icon'
// import type { Theme } from '@material-ui/core/styles'
// import { createStyles, makeStyles } from '@material-ui/core/styles'

// const styles = () =>
//   createStyles({
//     default: {
//       // No bottom spacing for the last Container
//       '&:last-child $content': {
//         marginBottom: 0,
//       },
//     },
//   })

// const useStyles = makeStyles<Theme>(styles, {
//   name: 'PicassoTimelineRow',
// })

// const Example = () => {
//   const classes = useStyles()

//   return <div style={{ maxWidth: 500 }}>
//     <Timeline>
//       <Timeline.Row icon={<Tasks16 />} date='1:15 PM, Jun 24, 2020' classes={{
//         dateColumn: classes.default
//       }}>
//         <Typography>
//           System marked job{' '}
//           <Link>
//             Principal Solutions Product Manager (203875) → Cleo O'Connell
//           </Link>{' '}
//           as inactive
//         </Typography>
//       </Timeline.Row>
//     </Timeline>
//   </div>
// }

// export default Example
