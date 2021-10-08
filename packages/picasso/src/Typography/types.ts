import type { SizeType as PicassoSizeType } from '@toptal/picasso-shared'

export type VariantType = 'heading' | 'body'

export type WeightType = 'thin' | 'light' | 'regular' | 'semibold' | 'inherit'

export type UnderlineType = 'solid' | 'dashed'

export type SizeType =
  | PicassoSizeType<'small' | 'medium' | 'large' | 'xlarge'>
  | 'inherit'
