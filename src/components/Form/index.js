import { createContext } from 'react'
import { Form } from './Form'
import { Item } from './Item'
import './index.scss'

Form.Item = Item

export const context = createContext()

export { Form }
