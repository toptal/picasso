import React from 'react'
import { List, Container } from '@toptal/picasso'
import { SPACING_6 } from '@toptal/picasso-utils'

const NestedExample = () => (
  <Container bottom={SPACING_6}>
    <Container>
      <h3>Ordered</h3>
      <Container>
        <List variant='ordered'>
          <List.Item>
            Consectetur enim ratione exercitationem dolorem totam. Vitae iste
            perspiciatis excepturi
          </List.Item>
          <List.Item>Adipisicing blanditiis cumque possimus ea?</List.Item>
          <List.Item>
            Sit consectetur amet doloribus odio
            <List variant='ordered'>
              <List.Item>
                Ipsum facere sunt vel odio quo, neque Doloremque alias
                perspiciatis.
              </List.Item>
              <List.Item>
                Dolor delectus officiis vero repudiandae reiciendis, dolores
                Sequi nostrum a!
              </List.Item>
              <List.Item>
                Lorem adipisicing voluptatum odio voluptatem quia, cum. Totam
                explicabo doloremque
                <List variant='ordered'>
                  <List.Item>Ipsum excepturi vero tenetur sapiente</List.Item>
                  <List.Item>
                    Consectetur doloribus aspernatur eius ipsam.
                  </List.Item>
                  <List.Item>Consectetur consectetur odio nisi fugit</List.Item>
                </List>
              </List.Item>
            </List>
          </List.Item>
        </List>
      </Container>
    </Container>

    <Container>
      <h3>Unordered</h3>
      <Container>
        <List variant='unordered'>
          <List.Item>
            Consectetur enim ratione exercitationem dolorem totam. Vitae iste
            perspiciatis excepturi
          </List.Item>
          <List.Item>Adipisicing blanditiis cumque possimus ea?</List.Item>
          <List.Item>
            Sit consectetur amet doloribus odio
            <List variant='unordered'>
              <List.Item>
                Ipsum facere sunt vel odio quo, neque Doloremque alias
                perspiciatis.
              </List.Item>
              <List.Item>
                Dolor delectus officiis vero repudiandae reiciendis, dolores
                Sequi nostrum a!
              </List.Item>
              <List.Item>
                Lorem adipisicing voluptatum odio voluptatem quia, cum. Totam
                explicabo doloremque
                <List variant='unordered'>
                  <List.Item>Ipsum excepturi vero tenetur sapiente</List.Item>
                  <List.Item>
                    Consectetur doloribus aspernatur eius ipsam.
                  </List.Item>
                  <List.Item>Consectetur consectetur odio nisi fugit</List.Item>
                </List>
              </List.Item>
            </List>
          </List.Item>
        </List>
      </Container>
    </Container>
  </Container>
)

export default NestedExample
