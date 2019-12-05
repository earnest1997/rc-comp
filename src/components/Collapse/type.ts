import { classNames } from 'classnames';
import { ICollapseProps } from './type';
import * as PropTypes from 'prop-types'
import {Omit} from '@/utils'

export type dataType={
  title: React.ReactNode
  content: React.ReactNode
}
export interface ICollapseProps {
  data:dataType[]
  className?:string
}
export interface IItemProps extends Omit<React.HTMLAttributes<HTMLLIElement>,"title">{
  title: React.ReactNode
  content: React.ReactNode
  isExpand?: boolean
  onTitleClick?: (index: number,e:React.MouseEvent) => void
}



export const propTypes = {
  title: PropTypes.node.isRequired,
  content: PropTypes.node.isRequired,
  isExpand: PropTypes.bool,
  onTitleClick: PropTypes.func
}
