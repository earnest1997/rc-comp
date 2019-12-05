import { createContext } from 'react'
import { Form } from './Form'
import { Item } from './Item'
import { IForm,IContext } from './type';

import './index.scss'

(Form as IForm).Item = Item

export const context = createContext<IContext|null>(null)

export { Form }
