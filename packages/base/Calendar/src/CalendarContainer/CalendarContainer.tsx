import type { ReactNode } from 'react'
import React from 'react'
import { twJoin } from '@toptal/picasso-tailwind-merge'

import { useCalendar } from '../CalendarContext'

export type CalendarContainerProps = {
  children?: ReactNode
  hasFooter?: boolean
  isFlexible?: boolean
}

export type RenderRoot = (args: CalendarContainerProps) => JSX.Element

const CalendarContainer = ({
  children,
  hasFooter,
  isFlexible,
}: CalendarContainerProps) => {
  const { renderRoot } = useCalendar()

  return renderRoot ? (
    <>{renderRoot({ hasFooter, children })}</>
  ) : (
    <div
      className={twJoin(
        'p-6 text-graphite-800 flex flex-col basis-[20.5rem] shadow-5 bg-white',
        hasFooter ? 'rounded-t-sm rounded-b-none' : 'rounded-sm',
        !isFlexible && 'max-w-[20.5rem]'
      )}
    >
      {children}
    </div>
  )
}

export default CalendarContainer
