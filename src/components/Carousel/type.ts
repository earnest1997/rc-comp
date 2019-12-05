import * as PropTypes from 'prop-types'
import {tuple,tupleNum} from '@/utils'

export const effectType=tuple('scrollX' ,'fade')
export const displayCountType =tupleNum(1,2,3)
export const displayViewType = tuple('nearToLeft','center')
export type itemArrType = [React.ReactNode[],number[]] 


export interface ICarouselProps extends React.HTMLAttributes<HTMLDivElement>{
  afterChange?:(current:number)=>void
  autoPlay?:boolean
  beforeChange?:(from:number,to:number)=>void,
  effect?:typeof effectType[number],
  // goNext?:()=>void
  // goPrev?:()=>void,
  height:number,
  width?:number,
  displayCount?:typeof displayCountType[number],
  displayView?:typeof displayViewType[number],
  isSlideMutipleTogether?:boolean,
  isShowDot?:boolean
}

export const propTypes={
  afterChange:PropTypes.func,
  autoPlay:PropTypes.bool,
  beforeChange:PropTypes.func,
  effect:PropTypes.oneOf(effectType),
  // goNext:PropTypes.func,
  // goPrev:PropTypes.func,
  height:PropTypes.number.isRequired ,
  displayCount:PropTypes.oneOf(displayCountType),
  width:PropTypes.number,
  displayView:PropTypes.oneOf(displayViewType),
  isSlideMutipleTogether:PropTypes.bool,
  isShowDot:PropTypes.bool
}

export const defaultProps:Partial<ICarouselProps>={
  autoPlay:false,
  effect:'scrollX',
  displayCount:3,
  displayView:displayViewType[0],
  isSlideMutipleTogether:false,
  isShowDot:true
}
export type refType={ goNext: () => Promise<void>; goPrev: () => Promise<void>; }
