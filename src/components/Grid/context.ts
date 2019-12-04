import { createContext } from 'react'
import { TGutter } from './Row/types'

export interface IContextValue {
  gutter: TGutter
}

export const context = createContext<IContextValue>({
  gutter: [0, 0]
})

context.displayName = 'Grid'
