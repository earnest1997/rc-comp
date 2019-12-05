import { classNames } from 'classnames';
import * as PropTypes from 'prop-types'

export interface IDropDownProps extends React.HTMLAttributes<HTMLSpanElement>{ 
  className?:string
  data:string[]
}

export const propTypes={
  className:PropTypes.string,
  data:PropTypes.array.isRequired
}