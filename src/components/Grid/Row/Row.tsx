import * as React from 'react'
import { forwardRef, useState } from 'react'
import classNames from 'classnames'
import { getPrefixCls, useResponsive } from '@/utils'
import { context } from '../context'
import { IRowProps, defaultProps, propTypes } from './types'

const prefixCls = getPrefixCls('row')

const Row = forwardRef(
  (
    {
      align,
      children,
      className,
      gutter,
      justify,
      style,
      ...restProps
    }: IRowProps,
    ref: React.RefObject<HTMLDivElement>
  ) => {
    const [screen, setScreen] = useState<string>()
    const rowCls = classNames(
      prefixCls,
      className,
      align && `${prefixCls}-align-${align}`,
      justify && `${prefixCls}-justify-${justify}`
    )
    useResponsive(setScreen)
    const normalizedGutter = (() => {
      const gutterArray = Array.isArray(gutter) ? gutter : [gutter, 0]
      return gutterArray.map((gutterItem) => {
        if (typeof gutterItem === 'object') {
          return screen ? gutterItem[screen] : 0
        }
        return gutterItem
      }) as [number, number]
    })()
    const rowStyle = {
      ...(normalizedGutter[0] > 0
        ? {
            marginLeft: normalizedGutter[0] / -2,
            marginRight: normalizedGutter[0] / -2
          }
        : {}),
      ...(normalizedGutter[1] > 0
        ? {
            marginTop: normalizedGutter[1] / -2,
            marginBottom: normalizedGutter[1] / -2
          }
        : {}),
      ...style
    }
    return (
      <context.Provider
        value={{
          gutter: normalizedGutter
        }}
      >
        <div ref={ref} className={rowCls} style={rowStyle} {...restProps}>
          {children}
        </div>
      </context.Provider>
    )
  }
)

Row.displayName = 'Row'

Row.defaultProps = defaultProps

Row.propTypes = propTypes

export default Row
