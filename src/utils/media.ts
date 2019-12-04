import * as c from '@/constants'
// import { EventEmitter } from './event'

type TSubscribeFunc = (screen: string) => void

const subscribers = new Map<number, Function>()

const mediaListeners: Array<{ media: MediaQueryList; listener: any }> = []

let subscribeId = -1

let currentScreen = ''

export const ResponsiveObserve = {
  subscribe(func: TSubscribeFunc) {
    if (subscribers.size === 0) {
      this.register()
    }
    subscribeId++
    subscribers.set(subscribeId, func)
    func(currentScreen)
    return subscribeId
  },
  unsubscribe(subscribeId: number) {
    subscribers.delete(subscribeId)
    if (subscribers.size === 0) {
      this.unregister()
    }
  },
  dispatch(screen: string) {
    currentScreen = screen
    subscribers.forEach((func) => {
      func(screen)
    })
  },
  register() {
    Object.keys(c.responsiveMap).forEach((screen) => {
      const mediaQuery = c.responsiveMap[screen]
      const media = window.matchMedia(mediaQuery)
      const listener = (params: any) => {
        if (params.matches) {
          this.dispatch(screen)
        }
      }
      listener(media)
      media.addListener(listener)
      mediaListeners.push({
        media,
        listener
      })
    })
  },
  unregister() {
    mediaListeners.forEach(({ media, listener }) => {
      media.removeListener(listener)
    })
  }
}
