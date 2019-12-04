import * as React from 'react'
import classNames from 'classnames'
import { getPrefixCls } from '@/utils'
import { IButtonGroupProps } from './types'

const { Children, cloneElement } = React
const prefixCls = getPrefixCls('button-group')

export const ButtonGroup = React.forwardRef(
  (
    {
      children,
      disabled,
      type,
      size,
      loading,
      ghost,
      htmlType,
      shape,
      className,
      ...restProps
    }: IButtonGroupProps,
    ref: React.RefObject<HTMLDivElement>
  ) => {
    const childCollect = Children.map(children, (child: any) =>
      cloneElement(child, {
        disabled,
        type,
        size,
        loading,
        ghost,
        htmlType,
        shape,
        ...child.props
      })
    )
    const classes = classNames(prefixCls, className)
    return (
      <div {...restProps} className={classes} ref={ref}>
        {childCollect}
      </div>
    )
  }
)

ButtonGroup.displayName = 'ButtonGroup'
