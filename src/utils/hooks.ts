import * as React from 'react'
import { ResponsiveObserve } from './media'

const { useState, useEffect, useCallback } = React

export const useResize = (callback?: (windowWidth?: number) => void) => {
  const resizeCallback = useCallback(() => {
    callback && callback(window.innerWidth)
  }, [])
  useEffect(() => {
    window.addEventListener('resize', resizeCallback)
    return () => {
      window.removeEventListener('resize', resizeCallback)
    }
  }, [])
}

export const useResponsive = (callback?: (screen?: string) => void) => {
  useEffect(() => {
    const subscribeId = ResponsiveObserve.subscribe((screen) => {
      callback && callback(screen)
    })
    return () => {
      ResponsiveObserve.unsubscribe(subscribeId)
    }
  }, [])
}
