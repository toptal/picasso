import HeaderLoader from '../HeaderLoader'
import TypographyLoader from '../TypographyLoader'
import ButtonLoader from '../ButtonLoader'
import MediaSkeletonLoader from '../MediaSkeletonLoader'

export interface StaticProps {
  Header: typeof HeaderLoader
  Typography: typeof TypographyLoader
  Button: typeof ButtonLoader
  Media: typeof MediaSkeletonLoader
}
export default {
  Header: HeaderLoader,
  Typography: TypographyLoader,
  Button: ButtonLoader,
  Media: MediaSkeletonLoader
} as StaticProps
