import React, {
  useEffect,
  forwardRef,
  useImperativeHandle,
  useState,
  useCallback,
  createRef
} from 'react'
import { createPortal, unmountComponentAtNode, render } from 'react-dom'
import classNames from 'classnames'
import { CSSTransition } from 'react-transition-group'
import { getPrefixCls } from '@/utils'
import Button  from '../Button'
import {defaultProps,IModalProps,propTypes,IRefType,IModal} from './type'
import './style'
import './index.scss'

const prefixCls = getPrefixCls('modal')

export const Modal = forwardRef<IRefType,IModalProps>(
  (
    {
      title,
      visible,
      children,
      onClose,
      className,
      footer,
      closable,
      maskClosable
    },
    ref
  ) => {
    const maskCls = classNames(`${prefixCls}-mask`)
    const modalCls = classNames(prefixCls, className)
    const titleCls = classNames(`${prefixCls}-title`)
    const bodyCls = classNames(`${prefixCls}-body`)
    const footerCls = classNames(`${prefixCls}-footer`)
    const iconCls = classNames(`${prefixCls}-icon ion-icon ion-ios-close`)
    const [privateVisible, setPrivateVisible] = useState(false)
    useEffect(() => {
      document.body.style.setProperty('overflow', visible ? 'hidden' : '')
      setPrivateVisible(visible)
    }, [visible])
    useImperativeHandle(ref, () => ({
      hide: () => {
        setPrivateVisible(false)
        document.body.style.setProperty('overflow', '')
      }
    }))
    const handleMaskClick = useCallback(() => {
      maskClosable && onClose && onClose()
    }, [maskClosable, onClose])
    return createPortal(
      <CSSTransition
        classNames={maskCls}
        in={privateVisible}
        unmountOnExit
        timeout={300}
      >
        <div className={maskCls} onClick={handleMaskClick}>
          <div
            className={modalCls}
            onClick={(event) => event.stopPropagation()}
          >
            <div className={titleCls}>
              <span>{title}</span>
              {closable && <i className={iconCls} onClick={onClose}></i>}
            </div>
            <div className={bodyCls}>{children}</div>
            {footer && <div className={footerCls}>{footer}</div>}
          </div>
        </div>
      </CSSTransition>,
      getRootNode()
    )
  }
) as IModal

Modal.displayName = 'Modal'

Modal.defaultProps = {
  closable: true,
  maskClosable: true
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

Modal.confirm = ({
  content,
  onConfirm,
  onCancel,
  hideCancel,
  closable,
  maskClosable,
  className,
  confirmText = '确定',
  cancelText = '取消',
  title = '提示'
}) => {
  let mountNode:any = document.createElement('div')
  const handleCancelClick = () => {
    onCancel && onCancel()
    hide()
  }
  const handleConfirmClick = () => {
    onConfirm && onConfirm()
    hide()
  }
  const ref = createRef<any>()
  render(
    <Modal
      title={title}
      onClose={handleCancelClick}
      visible
      ref={ref}
      closable={closable}
      maskClosable={maskClosable}
      className={className}
      footer={
        <>
          {hideCancel || (
            <Button onClick={handleCancelClick}>{cancelText}</Button>
          )}
          <Button onClick={handleConfirmClick} type='primary'>
            {confirmText}
          </Button>
        </>
      }
    >
      {content}
    </Modal>,
    mountNode
  )
  function hide() {
    ref.current!.hide()
    setTimeout(() => {
      unmountComponentAtNode(mountNode)
      mountNode = undefined
    }, 300)
  }
}

Modal.defaultProps = defaultProps

Modal.propTypes=propTypes