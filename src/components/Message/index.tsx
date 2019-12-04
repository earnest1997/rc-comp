import React, {
  createRef,
  useImperativeHandle,
  forwardRef,
  useState,
  useEffect
} from 'react'
import { createPortal, render, unmountComponentAtNode } from 'react-dom'
import { CSSTransition } from 'react-transition-group'
import classNames from 'classnames'
import { getPrefixCls } from '@/utils'
import {defaultProps, IMessageProp} from './type'
import './index.scss'

const prefixCls = getPrefixCls('message')

export const Message = forwardRef(({ type, children, visible }:IMessageProp, ref:React.RefObject<HTMLDivElement>) => {
  const messageCls = classNames(prefixCls, type && `${prefixCls}-${type}`)
  const iconCls = classNames(
    `${prefixCls}-icon`,
    `icon ion-ios-${
      {
        info: 'alert',
        success: 'checkmark-circle',
        error: 'close-circle'
      }[type]
    }`
  )
  const [privateVisible, setPrivateVisible] = useState(false)
  useEffect(() => {
    setPrivateVisible(visible)
  }, [visible])
  useImperativeHandle(ref, () => ({
    hide: () => {
      setPrivateVisible(false)
    }
  }))
  return createPortal(
    <CSSTransition
      classNames={prefixCls}
      timeout={300}
      in={privateVisible}
      unmountOnExit
    >
      <div className={messageCls}>
        <i className={iconCls} />
        <span className={`${prefixCls}-content`}>{children}</span>
      </div>
    </CSSTransition>,
    getRootNode()
  )
})

Message.info=(content:string, duration:number) => {
  renderMessage({ type: 'info', children: content, duration })
}

Message.success = (content:string, duration:number) => {
  renderMessage({ type: 'success', children: content, duration })
}

Message.error = (content:string, duration:number) => {
  renderMessage({ type: 'error', children: content, duration })
}

Message.displayName = 'Message'

Message.defaultProps = defaultProps

function renderMessage({ type, children, duration = 3000 }:{type:string,children:React.ReactNode[],duration:number}) {
  let mountNode:any = document.createElement('div') 
  const ref = createRef()
  render(
    <Message type={type} ref={ref} visible>
      {children}
    </Message>,
    mountNode
  )
  setTimeout(() => {
    ref.current!.hide()
    setTimeout(() => {
      unmountComponentAtNode(mountNode)
      mountNode = undefined
    }, 300)
  }, duration)
}

function getRootNode() {
  const rootCls = `${prefixCls}-root`
  let node = document.getElementsByClassName(rootCls)[0]
  if (!node) {
    node = document.createElement('div')
    node.classList.add(rootCls)
    document.body.appendChild(node)
  }
  return node
}
