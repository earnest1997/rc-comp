import * as propTypes from 'prop-types'
import {tuple} from '@/utils'

export const messageType=tuple('success','info','error')

export interface IMessageProp extends React.HTMLAttributes<HTMLSpanElement>{
type:typeof messageType[number];
visible:boolean;
}

export const defaultProps={
type:'info'
}
