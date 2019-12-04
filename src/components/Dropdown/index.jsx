import React, { forwardRef, useState, useCallback, useEffect } from 'react'
import classNames from 'classnames'
import { CSSTransition } from 'react-transition-group'
import { getPrefixCls } from '@/utils'
import './index.scss'

const prefixCls = getPrefixCls('dropdown')

export const Dropdown = forwardRef(
  ({ className, data, children, ...restProps }, ref) => {
    const [visible, setVisible] = useState(false)
    const handleMouseEnter = useCallback(() => {
      setVisible(true)
    }, [setVisible])
    const handleMouseLeave = useCallback(() => {
      setVisible(false)
    }, [setVisible])
    const handleButtonClick = useCallback((event) => {
      event.stopPropagation()
      event.nativeEvent.stopImmediatePropagation()
      setVisible(true)
    }, [])
    useEffect(() => {
      document.addEventListener('click', handleMouseLeave)
      return () => {
        document.removeEventListener('click', handleMouseLeave)
      }
    }, [handleMouseLeave])
    const dropdownCls = classNames(
      prefixCls,
      className,
      visible && `${prefixCls}-active`
    )
    const ulCls = classNames(`${prefixCls}-ul`)
    const buttonCls = classNames(`${prefixCls}-button`)
    const iconCls = classNames(
      'icon ion-md-arrow-dropdown',
      `${prefixCls}-icon`,
      visible && `${prefixCls}-icon-active`
    )
    return (
      <span
        className={dropdownCls}
        {...restProps}
        ref={ref}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleMouseEnter}
      >
        <span className={buttonCls} onClick={handleButtonClick}>
          <span>{children}</span>
          <i className={iconCls} />
        </span>
        <CSSTransition
          classNames={ulCls}
          timeout={300}
          unmountOnExit
          in={visible}
        >
          <ul className={ulCls}>
            {data.map((item, index) => (
              <Item key={index}>{item}</Item>
            ))}
          </ul>
        </CSSTransition>
      </span>
    )
  }
)

function Item({ children }) {
  return <li className={`${prefixCls}-item`}>{children}</li>
}

Dropdown.displayName = 'Dropdown'

Dropdown.defaultProps = {
  data: [<a href='xxx'>官网</a>, <a href='xxx'>论坛</a>]
}
