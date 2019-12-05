import React, { useState, useEffect, createRef, forwardRef } from 'react'
import { getPrefixCls } from '@/utils'
import classNames from 'classnames'
import {ITabProps,propTypes,defaultProps,ITitleProps} from './type'
import './style'


export const Tabs = ({ panels, activeId, onChange, type = 'card' }:ITabProps) => {
  // const [current, setCurrent] = useState(currentIndex)
  let currentIndex = 0
  const prefixCls = getPrefixCls(`tabs-${type}`)
  if (activeId !== undefined) {
    currentIndex = panels.findIndex(({ id }) => id === activeId)
  }
  const [current, setCurrent] = useState(currentIndex)
  const titleRefs = panels.map((_) => createRef<HTMLLIElement>())
  const panelCls = (index:number) =>
    classNames(
      `${prefixCls}-panel`,
      index !== current && `${prefixCls}-panel-hide`
    )
  const handleTitleItemClick = (index:number) => {
    activeId === undefined && setCurrent(index)
    onChange && onChange(panels[index].id)
  }
  useEffect(() => {
    if (activeId !== undefined) {
      const currentIndex = panels.findIndex(({ id }) => id === activeId)
      setCurrent(currentIndex)
    }
  }, [activeId, panels])
  const [animateBorderStyle, setAnimateBorderStyle] = useState({})
  useEffect(() => {
    const width = (titleRefs[current].current as any).offsetWidth
    const translateX = width * current
    const _animateBorderStyle = {
      width,
      ...{ transform: `translate3D(${translateX}px,0,0)` }
    } // eslint-disable-line
    setAnimateBorderStyle({ ..._animateBorderStyle })
  }, [current]) //eslint-disable-line
  return (
    <div className={prefixCls}>
      <ul className={`${prefixCls}-title`}>
        {panels.map(({ title }, index) => (
          <Title
            key={index}
            title={title}
            index={index}
            active={index === current}
            handleTitleItemClick={handleTitleItemClick}
            prefixCls={prefixCls}
            ref={titleRefs[index]!}
          />
        ))}
      </ul>
      <div
        className={`${prefixCls}-animate-border`}
        style={animateBorderStyle}
      />
      {panels.map(({ content }, index) => {
        return (
          <div className={panelCls(index)} key={index}>
            {content}
          </div>
        )
      })}
    </div>
  )
}

const Title=forwardRef((
  { title, index, active, handleTitleItemClick=()=>{}, prefixCls }:ITitleProps,
  ref:React.Ref<HTMLLIElement>
) =>{
  return (
    <li
      className={classNames(`${prefixCls}-title-item`, {
        active
      })}
      key={index}
      onClick={() => {
        handleTitleItemClick(index)
      }}
      ref={ref}
    >
      {title}
    </li>
  )
})

Tabs.displayName = 'Tabs'

Tabs.defaultProps = defaultProps

Tabs.propTypes=propTypes
