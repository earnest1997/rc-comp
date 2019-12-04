import React, { forwardRef, useImperativeHandle } from 'react'
import classNames from 'classnames'
import { getPrefixCls } from '@/utils'
import './index.scss'

const prefixCls = getPrefixCls('radio')

export const Radio = forwardRef(
  (
    {
      type,
      className,
      data,
      value,
      disabled,
      hidden,
      name,
      onChange,
      enableOperationAlways,
      ...restProps
    },
    ref
  ) => {
    const radioCls = classNames(
      prefixCls,
      className,
      type && `${prefixCls}-type`,
      disabled && `${prefixCls}-disabled`
    )
    const handleItemChange = (event, index) => {
      let value = event.target.value
      if (/^\d+$/.test(value)) {
        value = Number(value)
      }
      onChange && onChange(value, index)
    }
    useImperativeHandle(ref, () => ({
      // for form validate
      getValue: () => value
    }))
    return (
      <span className={radioCls} {...restProps} ref={ref}>
        {data.map(
          (
            { label, value: itemValue, disabled: itemDisabled, ...restProps },
            index
          ) => (
            <Item
              {...{
                label,
                value: itemValue,
                checked:
                  value === itemValue || Number(value) === Number(itemValue),
                onChange: handleItemChange,
                key: index,
                disabled: itemDisabled !== undefined ? itemDisabled : disabled,
                enableOperationAlways,
                index,
                ...restProps
              }}
            />
          )
        )}
      </span>
    )
  }
)

Radio.defaultProps = {
  data: []
}

Radio.displayName = 'Radio'

function Item({
  label,
  value,
  checked,
  onChange,
  disabled,
  hidden,
  enableOperationAlways,
  index,
  ...restProps
}) {
  const itemCls = classNames(
    `${prefixCls}-item`,
    disabled && `${prefixCls}-item-disabled`,
    checked && `${prefixCls}-item-checked`,
    hidden && `${prefixCls}-item-hidden`
  )
  const iconCls = classNames(
    `${prefixCls}-item-icon`,
    checked && `${prefixCls}-item-icon-checked`
  )
  return (
    <label className={itemCls} {...restProps}>
      <input
        type='radio'
        checked={checked}
        value={value}
        disabled={
          enableOperationAlways === undefined ? disabled : enableOperationAlways
        }
        onChange={(event) => onChange(event, index)}
      />
      <span className={iconCls} />
      <span className={`${prefixCls}-item-label`}>{label}</span>
    </label>
  )
}
