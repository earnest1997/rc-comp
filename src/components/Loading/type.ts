import { refType } from './../Carousel/type';
import * as PropTypes from 'prop-types'

export interface ILoadingProps extends React.HTMLAttributes<HTMLDivElement>{
  className?:string 
  text?:string
  visible:boolean
   full?:boolean
}

export const propTypes={
  className:PropTypes.string,
  text:PropTypes.string,
  visible:PropTypes.bool.isRequired,
  full:PropTypes.bool
}

export const defaultProps:Partial<ILoadingProps>={
  full:false,
  visible:false
}

export type refType={
  hide:()=>any
}
export interface ILoading extends React.ForwardRefExoticComponent<
ILoadingProps & React.RefAttributes<HTMLDivElement | refType>
> {
  show:()=>{ hide:()=>any}
}