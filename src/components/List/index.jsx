import React, { forwardRef } from 'react'
import classNames from 'classnames'
import { getPrefixCls } from '@/utils'
import './index.scss'

const prefixCls = getPrefixCls('list')

export const List = forwardRef(({ className, data, ...restProps }, ref) => {
  const ulCls = classNames(prefixCls, className)
  return (
    <ul className={ulCls} {...restProps} ref={ref}>
      {data.map((props, index) => (
        <Item key={index} {...props} />
      ))}
    </ul>
  )
})

List.displayName = 'List'

List.defaultProps = {
  data: []
}

function Item({ title, content, alignTop }) {
  const itemCls = classNames(
    `${prefixCls}-item`,
    alignTop && `${prefixCls}-item-top`
  )
  const titleCls = classNames(`${prefixCls}-title`)
  const contentCls = classNames(`${prefixCls}-content`)
  return (
    <li className={itemCls}>
      <div className={titleCls}>{title}</div>
      <div className={contentCls}>{content}</div>
    </li>
  )
}
