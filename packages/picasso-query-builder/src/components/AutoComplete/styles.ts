import { css } from 'styled-components'

type Props = {
  fullWidth: boolean
}

export const root = ({ fullWidth }: Props) => css`
  ${fullWidth
    ? `
      flex-grow: 1;
    `
    : `
      width: 206px;
      flex-shrink: 0;
  `}
`
