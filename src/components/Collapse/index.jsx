import React, { useState, useCallback, useRef, useEffect } from 'react'
import classNames from 'classnames'
import { getPrefixCls } from '@/utils'
import './index.scss'

const prefixCls = getPrefixCls('collapse')

export const Collapse = ({ data, className, ...restProps }) => {
  const collapseCls = classNames(prefixCls, className)
  const initialState = data.map((_) => false)
  initialState.length > 0 && (initialState[0] = true)
  const [expendList, setExpendList] = useState(initialState)
  const handleTitleClick = useCallback(
    (index) => {
      const clonedExpendList = [...expendList]
      clonedExpendList[index] = !clonedExpendList[index]
      setExpendList(clonedExpendList)
    },
    [expendList]
  )
  return (
    <ul className={collapseCls} {...restProps}>
      {data.map(({ title, content, status }, index) => (
        <Item
          title={title}
          content={content}
          status={status}
          isExpand={expendList[index]}
          key={index}
          onTitleClick={() => handleTitleClick(index)}
        />
      ))}
    </ul>
  )
}

Collapse.defaultProps = {
  data: []
}

function Item({ title, content, status, isExpand, onTitleClick }) {
  const refContent = useRef(null)
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
  const statusCls = classNames(`${prefixCls}-item-status`)
  useEffect(() => {
    setContentHeight(refContent.current.offsetHeight)
  }, [])
  return (
    <li className={itemCls}>
      <div className={titleCls} onClick={onTitleClick}>
        {title}
        <div className={statusCls}>
          <span>{status}</span>
          <i className={iconCls}></i>
        </div>
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
