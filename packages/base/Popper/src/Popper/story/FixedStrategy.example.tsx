import React, { useState } from 'react'
import { Button, Container, Typography, Popper } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'

const PopperContent = ({ children }: { children: React.ReactNode }) => (
  <Container
    top={SPACING_4}
    bottom={SPACING_4}
    left={SPACING_4}
    right={SPACING_4}
    className='bg-white border border-gray-400 rounded-sm'
  >
    {children}
  </Container>
)

const Example = () => {
  const [absoluteAnchorEl, setAbsoluteAnchorEl] =
    useState<HTMLButtonElement | null>(null)
  const [fixedAnchorEl, setFixedAnchorEl] = useState<HTMLButtonElement | null>(
    null
  )

  return (
    <Container>
      <Typography variant='body'>
        Both boxes below have <code>overflow: hidden</code> and the Popper uses{' '}
        <code>disablePortal</code>, so it renders in place as a real descendant
        of the clipping box (a portaled Popper would already escape the clip
        regardless of strategy). By default the Popper is positioned{' '}
        <code>absolute</code> and clipped by the box&apos;s edge.{' '}
        <code>popperOptions=&#123;&#123; positionFixed: true &#125;&#125;</code>{' '}
        positions it relative to the viewport instead, escaping the clip.
      </Typography>

      <Typography variant='heading' size='small' weight='semibold'>
        default (absolute) — clipped
      </Typography>
      <div className='relative overflow-hidden h-[80px] mt-2 border-2 border-dashed border-gray-400 rounded-sm flex items-center px-4'>
        <Button
          onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
            setAbsoluteAnchorEl(absoluteAnchorEl ? null : event.currentTarget)
          }
        >
          Toggle Popper
        </Button>
        <Popper
          open={Boolean(absoluteAnchorEl)}
          anchorEl={absoluteAnchorEl}
          placement='bottom-start'
          disablePortal
          autoWidth={false}
        >
          <PopperContent>Clipped by overflow: hidden</PopperContent>
        </Popper>
      </div>

      <Typography
        variant='heading'
        size='small'
        weight='semibold'
        className='mt-6'
      >
        positionFixed: true — escapes the clip
      </Typography>
      <div className='overflow-hidden h-[80px] mt-2 border-2 border-dashed border-gray-400 rounded-sm flex items-center px-4'>
        <Button
          onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
            setFixedAnchorEl(fixedAnchorEl ? null : event.currentTarget)
          }
        >
          Toggle Popper
        </Button>
        <Popper
          open={Boolean(fixedAnchorEl)}
          anchorEl={fixedAnchorEl}
          placement='bottom-start'
          disablePortal
          popperOptions={{ positionFixed: true }}
          autoWidth={false}
        >
          <PopperContent>Not clipped — positionFixed: true</PopperContent>
        </Popper>
      </div>
    </Container>
  )
}

export default Example
