import * as React from 'react'
import { forwardRef, useContext } from 'react'
import classNames from 'classnames'
import { getPrefixCls } from '@/utils'
import { breakPointArray } from '@/constants'
import { context } from '../context'
import {
  IColProps,
  IGridResponsiveObject,
  defaultProps,
  propTypes
} from './types'

const prefixCls = getPrefixCls('col')

const Col = forwardRef(
  (
    {
      className,
      style,
      children,
      span,
      order,
      offset,
      push,
      pull,
      ...restProps
    }: IColProps,
    ref: React.RefObject<HTMLDivElement>
  ) => {
    const { gutter } = useContext(context)
    const sizeClsObj = breakPointArray
      .map((size) => {
        let sizeProps: IGridResponsiveObject = {}
        const propSize = restProps[size]
        if (typeof propSize === 'number') {
          sizeProps.span = propSize
        } else if (typeof propSize === 'object') {
          sizeProps = propSize || {}
        }
        delete restProps[size]
        return {
          [`${prefixCls}-${size}-${sizeProps.span}`]:
            sizeProps.span !== undefined,
          [`${prefixCls}-${size}-order-${sizeProps.order}`]:
            sizeProps.order || sizeProps.order === 0,
          [`${prefixCls}-${size}-offset-${sizeProps.offset}`]:
            sizeProps.offset || sizeProps.offset === 0,
          [`${prefixCls}-${size}-push-${sizeProps.push}`]:
            sizeProps.push || sizeProps.push === 0,
          [`${prefixCls}-${size}-pull-${sizeProps.pull}`]:
            sizeProps.pull || sizeProps.pull === 0
        }
      })
      .reduce((prev, cur) => ({ ...prev, ...cur }), {})
    const colCls = classNames(
      prefixCls,
      className,
      sizeClsObj,
      span !== undefined && `${prefixCls}-${span}`,
      order && `${prefixCls}-order-${order}`,
      offset && `${prefixCls}-offset-${offset}`,
      push && `${prefixCls}-push-${push}`,
      pull && `${prefixCls}-pull-${pull}`
    )
    const colStyle = {
      ...(gutter[0] > 0
        ? {
            paddingLeft: gutter[0] / 2,
            paddingRight: gutter[0] / 2
          }
        : {}),
      ...(gutter[1] > 0
        ? {
            paddingTop: gutter[1] / 2,
            paddingBottom: gutter[1] / 2
          }
        : {}),
      ...style
    }
    return (
      <div className={colCls} ref={ref} style={colStyle} {...restProps}>
        {children}
      </div>
    )
  }
)

Col.displayName = 'Col'

Col.defaultProps = defaultProps

Col.propTypes = propTypes

export default Col
