import * as React from 'react'
import classNames from 'classnames'
import { getPrefixCls, omit } from '@/utils'
import { IButtonProps, propTypes, defaultProps } from './types'

const { forwardRef } = React

const prefixCls = getPrefixCls('button')
const ghostCls = `${prefixCls}-ghost`

export const Button = forwardRef(
  (
    {
      children,
      className,
      href,
      type,
      size,
      ghost,
      htmlType,
      block,
      loading,
      icon,
      shape,
      target,
      disabled,
      autoInsertSpaceInButton,
      onClick,
      ...restProps
    }: IButtonProps,
    ref: React.RefObject<HTMLAnchorElement & HTMLButtonElement>
  ) => {
    const btnSizeCls = size && `${prefixCls}-${size}`
    const btnShapeCls = shape && `${prefixCls}-${shape}`
    const btnTypeCls = type && `${prefixCls}-${type}`
    const btnGhostCls =
      (type && ghost && `${btnTypeCls}-ghost`) || (ghost && ghostCls)
    const btnBlockCls = block && `${prefixCls}-block`
    const loadingCls =
      loading && typeof loading === 'boolean' && `${prefixCls}-loading`
    const disabledCls = disabled && `${prefixCls}-disabled`
    const buttonCls = classNames(
      prefixCls,
      className,
      btnSizeCls,
      btnShapeCls,
      loadingCls,
      btnTypeCls,
      disabledCls,
      btnBlockCls,
      btnGhostCls
    )
    const isLink = !!href
    const handleClick = (e: React.MouseEvent) => {
      if (typeof onClick === 'function') {
        onClick(e)
      }
      if (
        document.activeElement &&
        document.activeElement.classList &&
        document.activeElement.classList.contains(prefixCls)
      ) {
        ;(document.activeElement as HTMLElement).blur()
      }
    }
    const htmlProps = {
      target,
      ref,
      ...restProps,
      className: buttonCls,
      onClick: handleClick
    }
    const content =
      typeof children === 'string' &&
      /[\u4e00-\u9fa5]{2}/g.test(children) &&
      children.length === 2
        ? children.match(/[\u4e00-\u9fa5]{1}/g) &&
          (children.match(/[\u4e00-\u9fa5]{1}/g) as string[]).join(' ')
        : children
    if (isLink) {
      return <a {...htmlProps}>{content}</a>
    } else {
      return (
        <button {...omit(htmlProps, 'target')} disabled={disabled}>
          {content}
        </button>
      )
    }
  }
)

Button.defaultProps = defaultProps

Button.propTypes = propTypes

Button.displayName = 'Button'
