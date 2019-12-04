import React, { forwardRef, useImperativeHandle } from 'react'
import classNames from 'classnames'
import { getPrefixCls } from '@/utils'
import './index.scss'

const prefixCls = getPrefixCls('switch')

export const Switch = forwardRef(
  (
    { className, type, disabled, children, checked, onChange, ...restProps },
    ref
  ) => {
    useImperativeHandle(ref, () => ({
      getValue: () => checked
    }))
    const switchCls = classNames(
      prefixCls,
      type && `${prefixCls}-${type}`,
      disabled && `${prefixCls}-disabled`,
      checked && `${prefixCls}-checked`
    )
    const iconCls = classNames(
      `${prefixCls}-icon`,
      checked && `${prefixCls}-icon-checked`
    )
    return (
      <label className={switchCls} ref={ref} {...restProps}>
        <input
          type='checkbox'
          disabled={disabled}
          checked={checked}
          onChange={onChange}
        />
        <span className={iconCls} />
      </label>
    )
  }
)

Switch.displayName = 'Switch'
