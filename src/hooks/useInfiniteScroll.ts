import { useEffect, useCallback, useRef } from 'react'
import { UI_CONFIG } from '../constants/config.js'

interface UseInfiniteScrollOptions {
  onLoadMore: () => void
  isLoading: boolean
  hasItems: boolean
  threshold?: number
  enabled?: boolean
}

export const useInfiniteScroll = ({
  onLoadMore,
  isLoading,
  hasItems,
  threshold = UI_CONFIG.INFINITE_SCROLL_THRESHOLD,
  enabled = true,
}: UseInfiniteScrollOptions) => {
  const isLoadingRef = useRef(false)

  useEffect(() => {
    isLoadingRef.current = isLoading
  }, [isLoading])

  const isNearBottom = useCallback(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    const scrollHeight = document.documentElement.scrollHeight
    const clientHeight = window.innerHeight
    return scrollTop + clientHeight >= scrollHeight - threshold
  }, [threshold])

  const handleScroll = useCallback(() => {
    if (!enabled || !hasItems || isLoading || isLoadingRef.current) {
      return
    }

    if (isNearBottom()) {
      isLoadingRef.current = true
      onLoadMore()
    }
  }, [enabled, hasItems, isLoading, isNearBottom, onLoadMore])

  useEffect(() => {
    if (!enabled || !hasItems) return

    const throttledHandleScroll = throttle(
      handleScroll,
      UI_CONFIG.THROTTLE_DELAY
    )
    window.addEventListener('scroll', throttledHandleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll)
    }
  }, [handleScroll, enabled, hasItems])

  const reset = useCallback(() => {
    isLoadingRef.current = false
  }, [])

  return { reset }
}

function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  return function (this: unknown, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}
