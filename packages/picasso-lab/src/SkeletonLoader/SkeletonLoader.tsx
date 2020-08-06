import HeaderLoader from '../HeaderLoader'
import TypographyLoader from '../TypographyLoader'
import ButtonLoader from '../ButtonLoader'

export interface StaticProps {
  Header: typeof HeaderLoader
  Typography: typeof TypographyLoader
  Button: typeof ButtonLoader
}
export default {
  Header: HeaderLoader,
  Typography: TypographyLoader,
  Button: ButtonLoader
} as StaticProps
