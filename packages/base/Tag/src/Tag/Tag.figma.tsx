import figma from '@figma/code-connect'
import React from 'react'
import {
  TagCompound as Tag,
  TagCheckable,
  TagRectangular,
} from '@toptal/picasso-tag'
import { Badge } from '@toptal/picasso-badge'
import { Settings16 } from '@toptal/picasso-icons'

const OUTLINED_URL =
  'https://www.figma.com/design/NcWffgzHm32CgC2HcMVuXq/Product-Library--Copy-?node-id=665-14182'

const FILLED_URL =
  'https://www.figma.com/design/NcWffgzHm32CgC2HcMVuXq/Product-Library--Copy-?node-id=18164-1804'

const RECT_URL =
  'https://www.figma.com/design/NcWffgzHm32CgC2HcMVuXq/Product-Library--Copy-?node-id=261-11652'

// ─── Tag Outlined ─────────────────────────────────────────────────────────────
// "With Edit" and "With Edit and Remove" layouts have no React equivalent:
// Tag has no onEdit prop — not wired up.
// Figma "Style" → React "variant": Secondary → 'light-grey' (property renamed + value changed).

figma.connect(Tag, OUTLINED_URL, {
  variant: { Layout: 'Basic' },
  props: {
    variant: figma.enum('Style', {
      Blue: 'blue',
      Secondary: 'light-grey',
      Red: 'red',
      Yellow: 'yellow',
      Green: 'green',
    }),
  },
  example: ({ variant }) => <Tag variant={variant}>Label</Tag>,
})

figma.connect(Tag, OUTLINED_URL, {
  variant: { Layout: 'With Icon' },
  props: {
    variant: figma.enum('Style', {
      Blue: 'blue',
      Secondary: 'light-grey',
      Red: 'red',
      Yellow: 'yellow',
      Green: 'green',
    }),
  },
  example: ({ variant }) => (
    <Tag variant={variant} icon={<Settings16 />}>
      Label
    </Tag>
  ),
})

figma.connect(Tag, OUTLINED_URL, {
  variant: { Layout: 'With Remove' },
  props: {
    variant: figma.enum('Style', {
      Blue: 'blue',
      Secondary: 'light-grey',
      Red: 'red',
      Yellow: 'yellow',
      Green: 'green',
    }),
  },
  example: ({ variant }) => (
    <Tag variant={variant} onDelete={() => {}}>
      Label
    </Tag>
  ),
})

figma.connect(Tag, OUTLINED_URL, {
  variant: { Layout: 'With Connection' },
  props: {
    variant: figma.enum('Style', {
      Blue: 'blue',
      Secondary: 'light-grey',
      Red: 'red',
      Yellow: 'yellow',
      Green: 'green',
    }),
  },
  example: ({ variant }) => (
    <Tag variant={variant} endAdornment={<Tag.Connection>0</Tag.Connection>}>
      Label
    </Tag>
  ),
})

figma.connect(Tag, OUTLINED_URL, {
  variant: { Layout: 'With Icon & Connection' },
  props: {
    variant: figma.enum('Style', {
      Blue: 'blue',
      Secondary: 'light-grey',
      Red: 'red',
      Yellow: 'yellow',
      Green: 'green',
    }),
  },
  example: ({ variant }) => (
    <Tag
      variant={variant}
      icon={<Settings16 />}
      endAdornment={<Tag.Connection>0</Tag.Connection>}
    >
      Label
    </Tag>
  ),
})

figma.connect(Tag, OUTLINED_URL, {
  variant: { Layout: 'With Badge' },
  props: {
    variant: figma.enum('Style', {
      Blue: 'blue',
      Secondary: 'light-grey',
      Red: 'red',
      Yellow: 'yellow',
      Green: 'green',
    }),
  },
  example: ({ variant }) => (
    <Tag variant={variant} endAdornment={<Badge content={1} size='medium' />}>
      Label
    </Tag>
  ),
})

figma.connect(Tag, OUTLINED_URL, {
  variant: { State: 'Disabled' },
  props: {
    variant: figma.enum('Style', {
      Blue: 'blue',
      Secondary: 'light-grey',
      Red: 'red',
      Yellow: 'yellow',
      Green: 'green',
    }),
  },
  example: ({ variant }) => (
    <Tag variant={variant} disabled>
      Label
    </Tag>
  ),
})

// ─── Tag Filled ───────────────────────────────────────────────────────────────
// Tag Filled has no direct React counterpart: Tag is always outlined (bg-white).
// Tag.Checkable is the closest: checked=true (green) ≈ High Contrast,
// checked=false (light-grey) ≈ Low Contrast.
// Layouts "With Connection", "With Badge", "With Icon + Badge": Tag.Checkable
// has no endAdornment prop — not mapped.
// Layout "With Indicator + Icon": TagRectangular has no icon prop — not mapped.

figma.connect(TagCheckable, FILLED_URL, {
  variant: { Layout: 'Basic' },
  props: {
    checked: figma.enum('Style', {
      'High Contrast': true,
      'Low Contrast': false,
    }),
  },
  example: ({ checked }) => (
    <Tag.Checkable checked={checked} onChange={() => {}}>
      Label
    </Tag.Checkable>
  ),
})

figma.connect(TagCheckable, FILLED_URL, {
  variant: { Layout: 'With Icon' },
  props: {
    checked: figma.enum('Style', {
      'High Contrast': true,
      'Low Contrast': false,
    }),
  },
  example: ({ checked }) => (
    <Tag.Checkable checked={checked} icon={<Settings16 />} onChange={() => {}}>
      Label
    </Tag.Checkable>
  ),
})

// ─── Tag Rectangle ────────────────────────────────────────────────────────────
// Figma "Status" → React "variant" (Solid) or "indicator" (Indicators).
// The two props are mutually exclusive in React — each Style maps to a separate connection.

figma.connect(TagRectangular, RECT_URL, {
  variant: { Style: 'Solid' },
  props: {
    variant: figma.enum('Status', {
      Positive: 'green',
      Dark: 'dark-grey',
      Light: 'light-grey',
      Negative: 'red',
      'Blue Light': 'light-blue',
      Warning: 'yellow',
      Blue: 'blue-main',
      'Blue Darker': 'blue-darker',
    }),
  },
  example: ({ variant }) => (
    <Tag.Rectangular variant={variant}>Label</Tag.Rectangular>
  ),
})

figma.connect(TagRectangular, RECT_URL, {
  variant: { Style: 'Indicators' },
  props: {
    indicator: figma.enum('Status', {
      Positive: 'green',
      Dark: 'grey-darker',
      Negative: 'red',
      Warning: 'yellow',
      Blue: 'blue',
      'Blue Darker': 'blue-darker',
      'Blue Light': 'light-blue',
    }),
  },
  example: ({ indicator }) => (
    <Tag.Rectangular indicator={indicator}>Label</Tag.Rectangular>
  ),
})
