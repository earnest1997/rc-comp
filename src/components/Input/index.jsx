import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import classNames from 'classnames'
import { getPrefixCls } from '@/utils'
import './index.scss'

const prefixCls = getPrefixCls('input')

export const Input = forwardRef(
  ({ type, className, disabled, onChange, ...restProps }, ref) => {
    const inputCls = classNames(
      className,
      prefixCls,
      type && `${prefixCls}-${type}`,
      disabled && `${prefixCls}-disabled`
    )
    const refInput = useRef(null)
    useImperativeHandle(ref, () => ({
      // for form validation
      getValue: () => refInput.current.value
    }))
    return (
      <input
        type='text'
        ref={refInput}
        disabled={disabled}
        className={inputCls}
        onChange={(event) => onChange(event.target.value)}
        {...restProps}
      />
    )
  }
)

Input.defaultProps = {
  onChange: () => {}
  // style: {
  //   width: 200
  // }
}

Input.displayName = 'Input'
