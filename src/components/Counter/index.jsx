import React, { useState, useEffect } from 'react'
import { getPrefixCls } from '@/utils'
import classNames from 'classnames'
import { Button } from '../Button'
import './index.scss'

const prefixCls = getPrefixCls('counter')
function handleClick(e, obj) {
  const { onChange = () => {}, step, type, val, setVal } = obj
  const updatedVal = type === 'minus' ? val - step : val + step
  setVal(updatedVal)
  onChange(updatedVal)
}

export const Counter = (props) => {
  const {
    value = '',
    defaultValue = '',
    min = '',
    max,
    step,
    disabled,
    ...restProps
  } = props
  const _min = min ? +min : 0
  const initVal = !value && !defaultValue ? _min : value || defaultValue
  const [val, setVal] = useState(initVal)
  useEffect(() => {
    if (!!value && value !== val) {
      setVal(value)
    }
  }, [value, val])
  const correctedVal = (val > max && max) || (val < min && min + '') || val + ''
  return (
    <div className={classNames(prefixCls, { disable: disabled })}>
      <Button
        className={classNames({ disabled: val <= min })}
        onClick={(e) => {
          if (val <= min || disabled) {
            return
          }
          handleClick(e, { type: 'minus', step, val, setVal, ...restProps })
        }}
      >
        -
      </Button>
      <div className='count'>{correctedVal}</div>
      <Button
        className={classNames({ disabled: val >= max })}
        onClick={(e) => {
          if (val >= max || disabled) {
            return
          }
          handleClick(e, { type: 'add', val, setVal, step, ...restProps })
        }}
      >
        +
      </Button>
    </div>
  )
}

Counter.displayName = 'Counter'
