import React, { useContext, useEffect, cloneElement, useRef } from 'react'
import classNames from 'classnames'
import { getPrefixCls } from '@/utils'
import {IItemProps} from './type'
import { context } from '.'

const prefixCls = getPrefixCls('form-item')
const {isValidElement}=React
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
}:IItemProps) => {
  const itemCls = classNames(prefixCls, className)
  const {
    labelWidth,
    showColon,
    collect,
    collectedMap,
    validateItem,
    hasValidate
  } = useContext(context)!
  const ref = useRef<any>(null)
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
          {shouldValidate && isValidElement(children)
            ? cloneElement(children  as React.ReactElement<any>, {
                ref,
                type: hasError ? 'error' : 'default',
                onChange: (...args:any[]) => {
                  (children.props as any).onChange && (children.props as any).onChange(...args)
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
