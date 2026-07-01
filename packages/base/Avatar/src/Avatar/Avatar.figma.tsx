import figma from '@figma/code-connect'
import { Avatar, UserBadge } from '@toptal/picasso'

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
