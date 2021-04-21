import React, { useState, ReactNode } from 'react'
import {
  Container,
  Sidebar,
  Overview16,
  Jobs16,
  Services16,
  Candidates16,
  Team16,
  Participants16,
  Billing16,
  LegalInfo16,
  Referrals16,
  Resources16,
  Report16,
  Bell16,
  Chat16,
  Page,
  Menu,
  Typography,
  Button,
  Grid,
  Image,
  Link,
  Avatar,
  Email16,
  Phone16,
  Skype16,
  Tag,
  ShowMore
} from '@toptal/picasso'
import {
  SkeletonLoader,
  Breadcrumbs,
  Section,
  Quote,
  List
} from '@toptal/picasso-lab'

const useGetData = (): boolean => {
  const [loading, setLoading] = useState(true)

  if (loading) {
    setTimeout(() => setLoading(false), 2000)
  }

  const reload = () => {
    setLoading(true)
  }

  return loading
}

const SidebarMenu = () => (
  <Sidebar>
    <Sidebar.Menu>
      <Sidebar.Item icon={<Overview16 />}>Overview</Sidebar.Item>
      <Sidebar.Item icon={<Jobs16 />}>Jobs</Sidebar.Item>
      <Sidebar.Item icon={<Services16 />}>Overview</Sidebar.Item>
      <Sidebar.Item icon={<Candidates16 />}>Interviews</Sidebar.Item>
      <Sidebar.Item icon={<Team16 />}>Team</Sidebar.Item>
      <Sidebar.Item icon={<Participants16 />}>Users</Sidebar.Item>
      <Sidebar.Item icon={<Billing16 />}>Billing</Sidebar.Item>
      <Sidebar.Item icon={<LegalInfo16 />}>Legal Info</Sidebar.Item>
      <Sidebar.Item
        collapsible
        icon={<Referrals16 />}
        menu={
          <Sidebar.Menu>
            <Sidebar.Item>Share Online</Sidebar.Item>
            <Sidebar.Item>Referred Users</Sidebar.Item>
            <Sidebar.Item>Commissions</Sidebar.Item>
            <Sidebar.Item>Payment Options</Sidebar.Item>
            <Sidebar.Item>Expected Commissions</Sidebar.Item>
          </Sidebar.Menu>
        }
      >
        Referrals
      </Sidebar.Item>
    </Sidebar.Menu>
    <Sidebar.Menu bottom>
      <Sidebar.Item icon={<Resources16 />}>Resources</Sidebar.Item>
      <Sidebar.Item icon={<Report16 />}>Feedback</Sidebar.Item>
    </Sidebar.Menu>
  </Sidebar>
)

const RightContent = () => (
  <>
    <Container inline right='small'>
      <Button variant='transparent'>Create Job</Button>
    </Container>
    <Container inline right='small'>
      <Bell16 color='white' />
    </Container>
    <Container inline right='small'>
      <Chat16 color='white' />
    </Container>
    <Page.TopBarMenu
      name='Jacqueline Roque'
      avatar='./jacqueline-with-flowers-1954-square.jpg'
    >
      <Menu>
        <Menu.Item>My Account</Menu.Item>
        <Menu.Item>Log Out</Menu.Item>
      </Menu>
    </Page.TopBarMenu>
  </>
)

const Content = () => (
  <>
    <Breadcrumbs>
      <Breadcrumbs.Item as={Link}>Jobs</Breadcrumbs.Item>
      <Breadcrumbs.Item as={Link}>UI/UX Designer</Breadcrumbs.Item>
      <Breadcrumbs.Item as={Link}>Candidates</Breadcrumbs.Item>
    </Breadcrumbs>
    <Container flex justifyContent='space-between' alignItems='center'>
      <Typography align='center' variant='heading' size='large'>
        Filippo Conforti
      </Typography>
      <div>
        <Button variant='secondary'>Message Filippo</Button>
        <Button variant='secondary'>Reject Candidate</Button>
        <Button>Accept and Schedule Start Date</Button>
      </div>
    </Container>
    <hr />

    <Section title='Interviews'>
      <Container bordered rounded padded='medium'>
        Foo
      </Container>
    </Section>

    <Section title='Candidate Details'>
      <Container bordered rounded padded='medium' bottom='medium'>
        Foo
      </Container>
      <Container flex>
        <div style={{ flex: 2, marginRight: 16 }}>
          <Container bottom='small'>
            <Typography variant='heading' size='small'>
              Recommendation
            </Typography>
          </Container>
          <Quote>
            Please, meet Filippo — an excellent fit for your project. For more
            than 8 years of his design career, Filippo has been fortunate to
            work with hundreds of clients from all over the world like such
            brands like Huawei, Samsung, Envato, and more. He works to make
            client ideas into ready viable projects that will change the world
            and be profitable.
            <Container flex top='small'>
              <Avatar
                src='./jacqueline-with-flowers-1954-square.jpg'
                alt='Default image'
              />
              <Container left='xsmall'>
                <Typography size='medium' weight='semibold'>
                  Danielle Ried
                </Typography>
                <Typography size='small'>Toptal Matcher</Typography>
              </Container>
            </Container>
          </Quote>
          <Container top='medium' bottom='small'>
            <Typography variant='heading' size='small'>
              Skills
            </Typography>
          </Container>
          <Tag.Group>
            <Tag>JavaScript</Tag>
            <Tag>CSS</Tag>
            <Tag>HTML</Tag>
            <Tag>React</Tag>
            <Tag>Material UI</Tag>
          </Tag.Group>
          <Container top='medium' bottom='small'>
            <Typography variant='heading' size='small'>
              Highlights
            </Typography>
          </Container>
          <Container bottom='small'>
            <Typography size='medium' weight='semibold'>
              Experience Designer Lead at Nest (2010–2016)
            </Typography>
          </Container>
          <ShowMore initialExpanded>
            <List>
              <List.Item>
                Designed landing pages, apps, and web pages for many Proctor &
                Gamble brands.
              </List.Item>
              <List.Item>
                Worked as the lead designer on Network90 - The worlds biggest
                professional athlete network, co-founded by Luis Figo.
              </List.Item>
              <List.Item>
                Worked as lead designer on Juice Motel, an exciting new
                lifestyle website & app, from renowned French fashion
                photographer Jean Baptiste Fort.
              </List.Item>
              <List.Item>
                Created detailed UI design tutorials for Digital Arts
                Online/Magazine.
              </List.Item>
              <List.Item>
                Wrote several articles, on a regular basis, for Designmodo.
              </List.Item>
            </List>
            <Container top='small'>
              <Typography size='medium' weight='semibold'>
                Technologies: Adobe Photoshop, Adobe Illustrator, Axure
              </Typography>
            </Container>
          </ShowMore>
          <Container top='small' bottom='small'>
            <Typography size='medium' weight='semibold'>
              Sr UX Architect at Microsoft (2007–2009)
            </Typography>
          </Container>
          <List>
            <List.Item>
              Worked as a lead designer on the Tottenham Hotspur website
              redesign. Tottenham Hotspur is one of the biggest soccer teams in
              the English Premier League.
            </List.Item>
            <List.Item>
              Worked as a lead designer on Standard Life Investments' redesign.
              I led a small team of designers to rebrand all of Standard Life
              Investments' websites and apps.
            </List.Item>
          </List>
          <Container top='small' bottom='small'>
            <Typography size='medium' weight='semibold'>
              Product Designer at Airbnb (2004–2006)
            </Typography>
          </Container>
          <List>
            <List.Item>
              Worked as lead designer on the Vue Cinemas' website - Vue Cinemas
              is the UK's largest cinema chain.
            </List.Item>
            <List.Item>
              Worked as the lead designer on Goals Soccer Centres - Goals Soccer
              Centres have over 80 locations in the UK, South Africa, and
              Australia.
            </List.Item>
          </List>

          <Container top='medium' bottom='small'>
            <Typography variant='heading' size='small'>
              Portfolio
            </Typography>
          </Container>
          <Container flex>
            <Container right='small'>
              <Image
                src='./portfolio1.jpeg'
                alt='Default image'
                style={{ height: 90 }}
              />
              <Container top='xsmall'>
                <Typography size='small'>
                  <Link>Imarda I360</Link>
                </Typography>
              </Container>
            </Container>
            <Container right='small'>
              <Image
                src='./portfolio2.jpeg'
                alt='Default image'
                style={{ height: 90 }}
              />
              <Container top='xsmall'>
                <Typography size='small'>
                  <Link>Ballance</Link>
                </Typography>
              </Container>
            </Container>
            <Container right='small'>
              <Image
                src='./portfolio3.jpeg'
                alt='Default image'
                style={{ height: 90 }}
              />
              <Container top='xsmall'>
                <Typography size='small'>
                  <Link>Unified Inbox</Link>
                </Typography>
              </Container>
            </Container>
          </Container>
        </div>
        <div style={{ flex: 1 }}>
          <Container bottom='small'>
            <Typography variant='heading' size='small'>
              Contact Info
            </Typography>
          </Container>
          <Container bottom='xsmall'>
            <Email16 /> <Link>filippo.conforti@mail.com</Link>
          </Container>
          <Container bottom='xsmall'>
            <Phone16 /> <Link>+1 905 660 358</Link>
          </Container>
          <Container>
            <Skype16 /> <Link>filippo.conforti</Link>
          </Container>
        </div>
      </Container>
    </Section>
  </>
)

const PageLoader = () => (
  <>
    <Container
      flex
      justifyContent='space-between'
      alignItems='center'
      bottom='small'
    >
      <SkeletonLoader.Header />
      <SkeletonLoader.Button />
    </Container>

    <Container bottom='small'>
      <SkeletonLoader.Typography rows={4} />
    </Container>

    <Grid>
      <Grid.Item small={6}>
        <Container flex alignItems='center' bottom='small' direction='column'>
          <SkeletonLoader.Header />

          <SkeletonLoader.Media variant='image' width='5rem' height='5rem' />
        </Container>

        <SkeletonLoader.Typography rows={5} />
      </Grid.Item>

      <Grid.Item small={6}>
        <Container flex justifyContent='center' bottom='small'>
          <SkeletonLoader.Header />
        </Container>
        <SkeletonLoader.Typography rows={8} />
      </Grid.Item>
    </Grid>
  </>
)

const Demo = () => {
  const loading = useGetData()

  return (
    <Page>
      <Page.TopBar rightContent={<RightContent />} />
      <Page.Content>
        <SidebarMenu />
        <Container
          style={{ flex: 1 }}
          top='small'
          bottom='small'
          left='small'
          right='small'
        >
          {loading && false ? PageLoader() : <Content />}
        </Container>
      </Page.Content>
    </Page>
  )
}

export default Demo
