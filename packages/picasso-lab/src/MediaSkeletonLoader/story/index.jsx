import { MediaSkeletonLoader } from '../MediaSkeletonLoader'
import PicassoBook from '~/.storybook/components/PicassoBook'

const componentDocs = {
  component: MediaSkeletonLoader,
  name: 'SkeletonLoader.Media',
  additionalDocs: {
    width: {
      name: 'width',
      type: {
        name: 'string | number',
        enums: ['image', 'avatar', 'icon']
      },
      description:
        '(**Image variant**) Width in an rem CSS unit as a string or pixel as a number',
      required: true
    },
    height: {
      name: 'height',
      type: 'string | number',
      description:
        '(**Image variant**) Height in an rem CSS unit as a string or pixel as a number',
      required: true
    },
    circle: {
      name: 'circle',
      type: 'boolean',
      description: '(**Image variant**) Transforms the loader as a circle'
    },
    sizeAvatar: {
      name: 'size',
      defaultValue: 'xsmall',
      type: {
        name: 'enum',
        enums: ['xxsmall', 'xsmall', 'small', 'medium', 'large']
      },
      description:
        '(**Avatar variant**) Applies the same sizes as the [Avatar](https://picasso.toptal.net/?path=/story/components-folder--avatar) component.'
    },
    sizeIcon: {
      name: 'size',
      defaultValue: 'medium',
      type: {
        name: 'enum',
        enums: ['medium', 'large']
      },
      description:
        '(**Icon variant**) Applies the same sizes as the [Icons](https://picasso.toptal.net/?path=/story/components-folder--icons) components.'
    }
  }
}

const chapter = PicassoBook.connectToPage(
  page =>
    page
      .createChapter('SkeletonLoader.Media')
      .addExample('MediaSkeletonLoader/story/Default.example.tsx', {
        id: 'MediaSkeletonLoader',
        waitUntilImagesLoaded: true
      }) // picasso-skip-visuals
)

export default {
  componentDocs,
  chapter
}
