import React, { useContext, useEffect, cloneElement, useRef } from 'react'
import classNames from 'classnames'
import { getPrefixCls } from '@/utils'
import { context } from '.'

const prefixCls = getPrefixCls('form-item')

export const Item = ({
  className,
  label,
  children,
  field,
  errorMessage,
  shouldValidate,
  rule,
  required,
  ...restProps
}) => {
  const itemCls = classNames(prefixCls, className)
  const {
    labelWidth,
    showColon,
    collect,
    collectedMap,
    validateItem,
    hasValidate
  } = useContext(context)
  const ref = useRef(null)
  useEffect(() => {
    shouldValidate && collect(field, rule, ref)
  }, [field, rule, collect, shouldValidate])
  const hasError = collectedMap[field] && collectedMap[field].hasError
  const errorCls = classNames(
    `${prefixCls}-error`,
    hasError || `${prefixCls}-error-hide`
  )
  return (
    <div className={itemCls} {...restProps}>
      <div className={`${prefixCls}-label`} style={{ width: labelWidth }}>
        {required && '* '}
        {label}
        {showColon && ':'}
      </div>
      <div className={`${prefixCls}-right`}>
        <div className={`${prefixCls}-input`}>
          {shouldValidate
            ? cloneElement(children, {
                ref,
                type: hasError ? 'error' : 'default',
                onChange: (...args) => {
                  children.props.onChange && children.props.onChange(...args)
                  hasValidate && validateItem(field, rule, ref)
                }
              })
            : children}
        </div>
        <div className={errorCls}>{errorMessage}</div>
      </div>
    </div>
  )
}

Item.defaultProps = {
  style: {}
}

Item.displayName = 'FormItem'
