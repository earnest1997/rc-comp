import * as PropTypes from 'prop-types'
import {tuple} from '@/utils'

export interface ICounterProps extends React.HTMLAttributes<HTMLDivElement>{
  value?:number;
  defaultValue?:number;
  min?:number;
  max:number;
  step?:number;
  disabled?:boolean;
}

export const defaultProps:Partial<ICounterProps>={
step:1,
value:0,
defaultValue:0,
min:0
}

export const propTypes={
value:PropTypes.string,
defaultValue:PropTypes.number,
min:PropTypes.number,
max:PropTypes.number.isRequired,
step:PropTypes.number,
disabled:PropTypes.bool
}
export const clickType = tuple('minus','add')

export interface IClick{
  val:number;
  setVal:React.Dispatch<React.SetStateAction<any>>;
  step?:number;
  type:typeof clickType[number];
  onChange?:(val:number)=>void;
}