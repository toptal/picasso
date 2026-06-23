import figma from '@figma/code-connect'
import { Avatar, UserBadge, AvatarUpload } from '@toptal/picasso'

figma.connect(
  Avatar,
  'https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=463-15416',
  {
    props: {
      size: figma.enum('Size', {
        '32px': 'xxsmall',
        '40px': 'xsmall',
        '80px': 'small',
        '120px': 'medium',
        '160px': 'large',
      }),
    },
    example: ({ size }) => (
      <Avatar
        size={size}
        src='https://example.com/avatar.jpg'
        name='John Doe'
      />
    ),
  }
)

figma.connect(
  UserBadge,
  'https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=7767-21674',
  {
    props: {
      size: figma.enum('Size', {
        XSmall: 'xsmall',
        Small: 'small',
      }),
    },
    example: ({ size }) => <UserBadge name='John Doe' size={size} />,
  }
)

figma.connect(
  AvatarUpload,
  'https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=3886-16524',
  {
    props: {
      size: figma.enum('Size', {
        '80x80': 'small',
        '160x160': 'large',
      }),
      uploading: figma.enum('State', {
        Loading: true,
      }),
      status: figma.enum('State', {
        Error: 'error',
      }),
    },
    example: ({ size, uploading, status }) => (
      <AvatarUpload size={size} uploading={uploading} status={status} />
    ),
  }
)
