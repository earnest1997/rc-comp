import * as PropTypes from 'prop-types'
import {tuple} from '@/utils'

export const tabType = tuple('card','line')

export interface panelType  {
title:string,
id:string | number,
content:React.ReactNode
}

export interface ITabProps {
type?:typeof tabType[number];
onChange?:(id:string | number)=>void;
activeId:number | string;
panels:panelType[];
}

export interface ITitleProps{
  active:boolean;
  prefixCls?:string;
  handleTitleItemClick?:(index:number)=>void;
  index:number;
  title:string;
}

export const propTypes= {
type:PropTypes.string,
onChange:PropTypes.func,
activeId:PropTypes.number.isRequired,
panels:PropTypes.node.isRequired
}

export const defaultProps={
  type:tabType[0]
}