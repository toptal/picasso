import React from 'react'
import { Page, Container, Typography } from '@toptal/picasso'

const Example = () => (
  <div style={{ maxHeight: '30rem', overflowY: 'scroll' }}>
    <Page>
      <Page.TopBar title='Scrollable example' />
      <Page.Content>
        <Content />
      </Page.Content>
      <Page.Footer />
    </Page>
  </div>
)

const Content = () => (
  <Container>
    <Typography align='center' variant='heading' size='large'>
      Scrollable example
    </Typography>
    <Typography>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Sollicitudin ac orci
      phasellus egestas tellus rutrum tellus pellentesque eu. Elementum
      facilisis leo vel fringilla est ullamcorper eget nulla. Massa id neque
      aliquam vestibulum. Lorem donec massa sapien faucibus et molestie ac
      feugiat sed. In aliquam sem fringilla ut morbi tincidunt augue interdum
      velit. Erat velit scelerisque in dictum non. Eros donec ac odio tempor
      orci dapibus. Ac tortor vitae purus faucibus ornare suspendisse. Amet
      commodo nulla facilisi nullam vehicula. Lacus vel facilisis volutpat est
      velit egestas dui id. Tortor dignissim convallis aenean et tortor at
      risus. Mauris in aliquam sem fringilla ut morbi tincidunt augue interdum.
      Nisl suscipit adipiscing bibendum est ultricies integer. Dolor magna eget
      est lorem ipsum dolor. Cursus eget nunc scelerisque viverra mauris. Id
      nibh tortor id aliquet lectus proin. Amet consectetur adipiscing elit duis
      tristique. Cursus risus at ultrices mi tempus imperdiet nulla malesuada
      pellentesque. Nascetur ridiculus mus mauris vitae ultricies leo. In nulla
      posuere sollicitudin aliquam ultrices sagittis orci. Volutpat blandit
      aliquam etiam erat velit. Mi proin sed libero enim sed faucibus turpis in.
      Odio morbi quis commodo odio. Convallis aenean et tortor at risus viverra
      adipiscing at in. Lorem donec massa sapien faucibus et molestie ac. Non
      enim praesent elementum facilisis leo vel fringilla est ullamcorper.
      Interdum velit euismod in pellentesque massa placerat duis ultricies
      lacus. Feugiat nibh sed pulvinar proin gravida hendrerit lectus a. Nisl
      rhoncus mattis rhoncus urna neque. Pretium lectus quam id leo in vitae
      turpis massa. Diam phasellus vestibulum lorem sed risus ultricies
      tristique nulla. Dui faucibus in ornare quam viverra orci sagittis. Sed
      nisi lacus sed viverra. Phasellus vestibulum lorem sed risus ultricies
      tristique nulla. Amet mauris commodo quis imperdiet massa tincidunt nunc
      pulvinar. Eu nisl nunc mi ipsum. Arcu dictum varius duis at consectetur
      lorem. Cras semper auctor neque vitae tempus quam pellentesque. Tincidunt
      praesent semper feugiat nibh sed. Ullamcorper dignissim cras tincidunt
      lobortis feugiat vivamus. Consequat mauris nunc congue nisi vitae. Fusce
      ut placerat orci nulla. Sit amet nisl suscipit adipiscing bibendum est.
      Nibh tortor id aliquet lectus proin.
    </Typography>
  </Container>
)

export default Example
