import * as propType from 'prop-types'

export interface IModalProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  visible: boolean
  onClose?: () => void
  className?: string
  footer?: React.ReactNode
  closable?: boolean
  maskClosable?: boolean
}

export const propTypes = {
  title: propType.string,
  visible: propType.bool.isRequired,
  onClose: propType.func,
  className: propType.string,
  closable: propType.bool,
  maskClosable: propType.bool,
  footer:propType.node
}

export const defaultProps: Partial<IModalProps> = {
  visible: false,
  closable: true,
  maskClosable: false
}


export interface IRefType {
  hide: () => void
}

export interface IConfirmParam{
  content: string,
  maskClosable: boolean,
  className: string,
  confirmText: string,
  cancelText: string,
  title: string,
      onConfirm?: () => void,
  onCancel?: () => void,
  hideCancel?: () => void,
  closable?: boolean
}
interface IConfirm {
  (
arg:IConfirmParam
   ) : void;
}
export interface IModal
  extends React.ForwardRefExoticComponent<
    IModalProps & React.RefAttributes<HTMLInputElement>
  > {
  confirm:IConfirm
}
