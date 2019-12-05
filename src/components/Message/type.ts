import * as propTypes from 'prop-types'
import {tuple} from '@/utils'

export const messageType=tuple('success','info','error')

export interface IMessageProps extends React.HTMLAttributes<HTMLSpanElement>{
type:typeof messageType[number];
visible:boolean;
}

export const defaultProps={
type:'info'
}

export type refType={
  hide:()=>void
}

export type classType={
  [key: string]: string;
}

export type callType=(content:string, duration:number) =>void

export interface IMessage extends React.ForwardRefExoticComponent<
IMessageProps & React.RefAttributes<HTMLDivElement | refType>
> {
  error:callType
  info:callType
  success:callType
}