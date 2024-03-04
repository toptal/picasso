import type { ZoomBehavior, ZoomedElementBaseType } from 'd3-zoom'
import type { RefObject } from 'react'
import { useEffect, useMemo, useState } from 'react'
import { zoom as d3zoom, select, zoomIdentity } from 'd3'

export interface UseZoomArguments<
  ZoomRefElement extends ZoomedElementBaseType
> {
  rootRef: RefObject<ZoomRefElement>
  scaleExtent: [number, number]
  center?: { x: number; y: number }
  initialScale?: number
  transitionDuration: number
}

export interface UseZoomResponse<ZoomRefElement extends ZoomedElementBaseType> {
  zoom: ZoomBehavior<ZoomRefElement, unknown>
  handleZoom: (step: number) => void
}

export const useZoom = <ZoomRefElement extends ZoomedElementBaseType>({
  rootRef,
  scaleExtent,
  center,
  initialScale = 1,
  transitionDuration,
}: UseZoomArguments<ZoomRefElement>): UseZoomResponse<ZoomRefElement> => {
  const [initialized, setInitialized] = useState(false)
  const zoom = useMemo(
    () => d3zoom<ZoomRefElement, unknown>().scaleExtent(scaleExtent),
    [scaleExtent]
  )

  const handleZoom = (step: number) => {
    if (!rootRef.current) {
      return
    }

    select(rootRef.current).transition().call(zoom.scaleBy, step)
  }

  useEffect(() => {
    if (!rootRef.current) {
      return
    }

    const transformContainer = select(rootRef.current.firstElementChild)

    zoom.on('zoom', (event: any) => {
      transformContainer.attr('transform', event.transform)
    })

    if (!initialized) {
      select(rootRef.current)
        .call(zoom)
        .call(zoom.transform, zoomIdentity.scale(initialScale))

      if (center) {
        select(rootRef.current).call(zoom.translateTo, center.x, center.y)
      }

      setInitialized(true)
    } else if (center) {
      select(rootRef.current)
        .transition()
        .duration(transitionDuration)
        .call(zoom.translateTo, center.x, center.y)
    }
  }, [zoom, initialized, center, rootRef, initialScale, transitionDuration])

  return {
    zoom,
    handleZoom,
  }
}
