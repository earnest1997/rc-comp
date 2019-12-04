import React from 'react'
import classNames from 'classnames'
import { getPrefixCls } from '@/utils'
import './index.scss'

const prefixCls = getPrefixCls('steps')

export const Steps = (props) => {
  const { steps, current, className, onClick } = props
  const len = steps.length
  return (
    <div className={classNames(prefixCls, className)}>
      {steps.map(({ title, id }, index) => (
        <Item
          key={index}
          active={index <= current}
          finished={index < current}
          title={title}
          isEnd={index === len - 1}
          index={index + 1}
          onClick={() => index <= current && onClick(id)}
        />
      ))}
    </div>
  )
}

function Item({ title, active, isEnd, index, finished, onClick }) {
  return (
    <div
      className={classNames(`${prefixCls}-item-container`, {
        active
      })}
    >
      <div className={`${prefixCls}-col col-01`} onClick={onClick}>
        {index}
      </div>
      <div className={`${prefixCls}-col col-02`} onClick={onClick}>
        {title}
      </div>
      <div
        className={classNames(`${prefixCls}-col col-03`, {
          finished,
          hidden: isEnd
        })}
      />
    </div>
  )
}

Steps.displayName = 'Steps'
