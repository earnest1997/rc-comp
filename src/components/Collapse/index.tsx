import React, { useState, useCallback, useRef, useEffect } from 'react'
import classNames from 'classnames'
import { getPrefixCls } from '@/utils'
import {ICollapseProps,IItemProps,propTypes} from './type'
import './style'

const prefixCls = getPrefixCls('collapse')

export const Collapse = ({ data, className, ...restProps }:ICollapseProps) => {
  const collapseCls = classNames(prefixCls, className)
  const initialState = data.map((_) => false)
  initialState.length > 0 && (initialState[0] = true)
  const [expendList, setExpendList] = useState(initialState)
  const aa=89999
  let aaa=99999
  const handleTitleClick = useCallback(
    (e,index) => {
      const clonedExpendList = [...expendList]
      clonedExpendList[index] = !clonedExpendList[index]
      setExpendList(clonedExpendList)
    },
    [expendList]
  )
  return (
    <ul className={collapseCls} {...restProps}>
      {data.map(({ title, content }, index) => (
        <Item
          title={title}
          content={content}
          isExpand={expendList[index]}
          key={index}
          onTitleClick={(e) => handleTitleClick(e,index)}
        />
      ))}
    </ul>
  )
}

Collapse.defaultProps = {
  data: []
}

function Item({ title, content, isExpand, onTitleClick }:IItemProps) {
  const refContent = useRef<HTMLDivElement>(null)
  const [contentHeight, setContentHeight] = useState(0)
  const itemCls = classNames(
    `${prefixCls}-item`,
    isExpand && `${prefixCls}-item-expand`
  )
  const titleCls = `${prefixCls}-item-title`
  const contentCls = classNames(
    `${prefixCls}-item-content`,
    isExpand && `${prefixCls}-item-content-expand`
  )
  const iconCls = classNames(
    `${prefixCls}-item-icon`,
    isExpand && `${prefixCls}-item-icon-expand`,
    `ion-ios-arrow-forward`
  )
  useEffect(() => {
    setContentHeight(refContent.current!.offsetHeight)
  }, [])
  return (
    <li className={itemCls}>
      <div className={titleCls} onClick={e=>onTitleClick}>
        {title}
      </div>
      <div
        className={contentCls}
        style={{ height: isExpand ? contentHeight : 0 }}
      >
        <div ref={refContent} style={{ overflow: 'hidden' }}>
          {content}
        </div>
      </div>
    </li>
  )
}
