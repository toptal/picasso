type Sizes = 'xsmall' | 'small' | 'medium' | 'large'

export type SizeType<T extends Sizes> = T
