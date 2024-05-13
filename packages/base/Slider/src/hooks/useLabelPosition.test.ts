import { renderHook } from '@testing-library/react-hooks'
import { describe, expect, it } from '@jest/globals'
import type React from 'react'

import { useLabelPosition, positionClasses } from './useLabelPosition'

describe('useLabelPosition', () => {
  describe('when leftBoundary < 16', () => {
    it('returns right position class', () => {
      const ref = {
        current: {
          getBoundingClientRect: () => ({
            left: 0,
            right: 0,
            width: 20,
          }),
        } as unknown as HTMLSpanElement,
      } as React.RefObject<HTMLSpanElement>

      const { result } = renderHook(() =>
        useLabelPosition({
          ref,
          doRangeLabelsOverlap: false,
          sliderValue: 5,
          index: 0,
        })
      )

      expect(result.current).toEqual(positionClasses.right)
    })
  })

  describe('when rightBoundary > window.innerWidth - 16', () => {
    it('returns left position class', () => {
      const ref = {
        current: {
          getBoundingClientRect: () => ({
            left: 950,
            right: 1050,
            width: 100,
          }),
        } as unknown as HTMLSpanElement,
      } as React.RefObject<HTMLSpanElement>

      const { result, rerender } = renderHook(() =>
        useLabelPosition({
          ref,
          doRangeLabelsOverlap: false,
          sliderValue: 5,
          index: 1,
        })
      )

      expect(result.current).toEqual(positionClasses.left)

      // When position is already left, rightBoundary is rect.right + halfWidth
      // So even though innerWidth is 1024, rightBoundary is 1000 + (100 / 2) = 1050
      const newRef = {
        current: {
          getBoundingClientRect: () => ({
            left: 900,
            right: 1000,
            width: 100,
          }),
        } as unknown as HTMLSpanElement,
      } as React.RefObject<HTMLSpanElement>

      rerender({
        ref: newRef,
        doRangeLabelsOverlap: false,
        sliderValue: 5,
        index: 1,
      })

      expect(result.current).toEqual(positionClasses.left)
    })
  })

  describe('when doRangeLabelsOverlap is true', () => {
    describe('when index is 0', () => {
      it('returns left position class', () => {
        const ref = {
          current: {
            getBoundingClientRect: () => ({
              left: 30,
              right: 50,
              width: 20,
            }),
          } as unknown as HTMLSpanElement,
        } as React.RefObject<HTMLSpanElement>

        const { result } = renderHook(() =>
          useLabelPosition({
            ref,
            doRangeLabelsOverlap: true,
            sliderValue: 5,
            index: 0,
          })
        )

        expect(result.current).toEqual(positionClasses.left)
      })
    })

    describe('when index is not 0', () => {
      it('returns right position class', () => {
        const ref = {
          current: {
            getBoundingClientRect: () => ({
              left: 30,
              right: 50,
              width: 20,
            }),
          } as unknown as HTMLSpanElement,
        } as React.RefObject<HTMLSpanElement>

        const { result } = renderHook(() =>
          useLabelPosition({
            ref,
            doRangeLabelsOverlap: true,
            sliderValue: 5,
            index: 1,
          })
        )

        expect(result.current).toEqual(positionClasses.right)
      })
    })
  })

  describe('when none of the conditions meet', () => {
    it('returns center position class', () => {
      const ref = {
        current: {
          getBoundingClientRect: () => ({
            left: 30,
            right: 50,
            width: 20,
          }),
        } as unknown as HTMLSpanElement,
      } as React.RefObject<HTMLSpanElement>

      const { result } = renderHook(() =>
        useLabelPosition({
          ref,
          doRangeLabelsOverlap: false,
          sliderValue: 5,
          index: 0,
        })
      )

      expect(result.current).toEqual(positionClasses.center)
    })
  })
})
