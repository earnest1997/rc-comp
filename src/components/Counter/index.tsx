import React, { useState, useEffect } from 'react'
import { getPrefixCls } from '@/utils'
import classNames from 'classnames'
import { ICounterProps,defaultProps,propTypes,IClick} from './type'
import Button  from '../Button'
import './style'

const prefixCls = getPrefixCls('counter')
function handleClick(e:React.MouseEvent, obj:IClick) {
  const { onChange = () => {}, step, type, val, setVal } = obj
  const updatedVal = type === 'minus' ? val - step! : val + step!
  setVal(updatedVal)
  onChange && onChange(updatedVal)
}

export const Counter = ({ value ,
  defaultValue ,
  min ,
  max,
  step,
  disabled,
  className,
  ...restProps}:ICounterProps) => {
  const _min = min+'' ? +min! : 0
  const initVal = !(value+'') && !(defaultValue+'') ? (_min+'') : (value+'') || (defaultValue+'')
  const [val, setVal] = useState(+initVal)
  useEffect(() => {
    if (value !== undefined && value !== val) {
      setVal(value)
    }
  }, [value, val])
  const correctedVal = (val! > max && max) || (val < _min && _min + '') || val + ''
  return (
    <div className={classNames(prefixCls, { disable: disabled },className)} { ...restProps}>
      <Button
        className={classNames({ disabled: val <= _min })}
        onClick={(e:React.MouseEvent) => {
          if (val <= _min || disabled) {
            return
          }
          handleClick(e, { type: 'minus', step, val, setVal })
        }}
      >
        -
      </Button>
      <div className='count'>{correctedVal}</div>
      <Button
        className={classNames({ disabled: val >= max })}
        onClick={(e:React.MouseEvent) => {
          if (val >= max || disabled) {
            return
          }
          handleClick(e, { type: 'add', val, setVal, step })
        }}
      >
        +
      </Button>
    </div>
  )
}

Counter.displayName = 'Counter'

Counter.propTypes=propTypes

Counter.defaultProps=defaultProps