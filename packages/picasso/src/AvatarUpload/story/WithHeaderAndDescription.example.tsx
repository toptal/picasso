import React from 'react'
import { AvatarUpload, Container, Link, Typography } from '@toptal/picasso'

const Example = () => {
  const header = (
    <Container flex direction='column' bottom='small'>
      <Typography variant='heading'>Profile Photo</Typography>
      <Typography size='small'>
        Please upload a high-quality profile photo. Freelancers with
        professional profile photos are prioritized and see more jobs with
        Toptal clients.
      </Typography>
    </Container>
  )

  const fileDescription = (
    <Container
      flex
      direction='column'
      gap='small'
      justifyContent='center'
      left='small'
    >
      <Typography size='xxsmall' color='grey'>
        JPG / PNG file
      </Typography>
      <Typography size='xxsmall' color='grey'>
        Minimum resolution: 380x380px
      </Typography>
      <Typography size='xxsmall' color='grey'>
        Maximum file size: 25 MB
      </Typography>
      <Link>View our high-quality headshot guide</Link>
    </Container>
  )

  return (
    <Container padded='medium'>
      <AvatarUpload
        header={header}
        description={fileDescription}
        size='large'
      />
    </Container>
  )
}

export default Example
