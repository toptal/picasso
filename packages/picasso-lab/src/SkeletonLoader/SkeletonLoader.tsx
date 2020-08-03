import HeaderLoader from '../HeaderLoader'
import TypographyLoader from '../TypographyLoader'

export interface StaticProps {
  Header: typeof HeaderLoader
  Typography: typeof TypographyLoader
}
export default {
  Header: HeaderLoader,
  Typography: TypographyLoader
} as StaticProps
