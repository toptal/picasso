import React, { Fragment, useState, useEffect, CSSProperties } from 'react'
import { withStyles } from '@material-ui/core/styles'

import { Classes } from '../styles/types'
import ClippedCornerMask from './ClippedCornerMask'
import RoundedMask from './RoundedMask'
import styles from './styles'

type VariantType = 'default' | 'rounded'

interface Props {
  classes: Classes
  /** Image url */
  src: string
  /** Image shape type */
  variant: VariantType
  style?: CSSProperties
}

const useComponentRect = (
  ref: React.RefObject<SVGSVGElement>
): ClientRect | DOMRect => {
  const [contentRect, setContentRect] = useState(
    ref.current ? ref.current.getBoundingClientRect() : ({} as ClientRect)
  )

  useEffect(() => {
    if (!ref.current) {
      return
    }

    return setContentRect(ref.current.getBoundingClientRect())
  }, [])

  return contentRect
}

function getUniqueID() {
  return (
    'clip-path-' +
    Math.random()
      .toString(36)
      .substring(7)
  )
}

function getClippedCornerSize(width: number) {
  if (width < 119) {
    return 8
  }

  if (width > 180) {
    return 24
  }

  return 16
}

export const Image: React.FunctionComponent<Props> = props => {
  const { src, classes, variant, style } = props
  let svgImageRef = React.createRef<SVGSVGElement>()

  const { width, height } = useComponentRect(svgImageRef)
  const clipPathId = getUniqueID()
  const clippedCornerSize = getClippedCornerSize(width)

  return (
    <svg
      className={classes.svg}
      style={style}
      ref={svgImageRef}
      version='1.1'
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
    >
      {width && height ? (
        <Fragment>
          <defs>
            {variant === 'default' ? (
              <ClippedCornerMask
                clipPathId={clipPathId}
                cornerWidth={clippedCornerSize / width}
                cornerHeight={clippedCornerSize / height}
              />
            ) : (
              <RoundedMask clipPathId={clipPathId} radius={width / 2} />
            )}
          </defs>

          <image
            clipPath={`url(#${clipPathId})`}
            xlinkHref={src}
            height='100%'
            width='100%'
            preserveAspectRatio='none'
          />
        </Fragment>
      ) : null}
    </svg>
  )
}

Image.defaultProps = {
  variant: 'default'
}

Image.displayName = 'Image'

export default withStyles(styles)(Image)
