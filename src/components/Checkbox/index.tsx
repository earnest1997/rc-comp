import React, { forwardRef, useImperativeHandle, useCallback } from 'react'
import classNames from 'classnames'
import { getPrefixCls } from '../../utils'
import './index.scss'

const prefixCls = getPrefixCls('checkbox')

export const Checkbox = forwardRef(
  ({ type, className, data, value, disabled, onChange, ...restProps }, ref) => {
    const checkboxCls = classNames(
      prefixCls,
      className,
      type && `${prefixCls}-type`,
      disabled && `${prefixCls}-disabled`
    )
    const handleItemChange = useCallback(
      (event) => {
        const itemValue = event.target.value
        const itemChecked = event.target.checked
        if (itemChecked) {
          onChange && onChange(value.concat(itemValue))
        } else {
          onChange && onChange(value.filter((v) => v !== itemValue))
        }
      },
      [onChange, value]
    )
    useImperativeHandle(ref, () => ({
      // for form validate
      getValue: () => value
    }))
    return (
      <span className={checkboxCls} {...restProps} ref={ref}>
        {data.map(({ label, value: itemValue, disabled: itemDisabled }) => (
          <Item
            {...{
              label,
              value: itemValue,
              checked: value.includes(itemValue),
              onChange: handleItemChange,
              key: itemValue,
              disabled: itemDisabled !== undefined ? itemDisabled : disabled
            }}
          />
        ))}
      </span>
    )
  }
)

// forwardRef needed
Checkbox.displayName = 'Checkbox'

Checkbox.defaultProps = {
  data: [],
  value: []
}

function Item({ label, value, checked, onChange, disabled }) {
  const itemCls = classNames(
    `${prefixCls}-item`,
    disabled && `${prefixCls}-item-disabled`
  )
  const iconCls = classNames(
    `${prefixCls}-item-icon`,
    checked && `${prefixCls}-item-icon-checked`
  )
  return (
    <label className={itemCls}>
      <input
        type='checkbox'
        checked={checked}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      <span className={iconCls} />
      <span className={`${itemCls}-label`}>{label}</span>
    </label>
  )
}
