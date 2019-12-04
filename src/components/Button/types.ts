import * as PropTypes from 'prop-types'
import { tuple } from '@/utils'
export const ButtonSizes = tuple('small', 'large')

export const ButtonShapes = tuple('circle', 'round')

export const ButtonTypes = tuple('primary', 'dashed', 'danger', 'link')

export const ButtonHtmlTypes = tuple('submit', 'button', 'reset')

export interface IButtonProps
  extends React.HTMLAttributes<HTMLButtonElement & HTMLAnchorElement> {
  ghost?: boolean
  href?: string
  icon?: string
  loading?: boolean
  shape?: typeof ButtonShapes[number]
  size?: typeof ButtonSizes[number]
  target?: string
  type?: typeof ButtonTypes[number]
  block?: boolean
  htmlType?: typeof ButtonHtmlTypes[number]
  disabled?: boolean
  style?: React.CSSProperties
  autoInsertSpaceInButton?: boolean
  onClick?:(e:React.MouseEvent)=>void
}

export type IButtonGroupProps = Omit<
  IButtonProps,
  'href' | 'icon' | 'target' | 'block'
> &
  React.HTMLAttributes<HTMLDivElement>

export const propTypes = {
  ghost: PropTypes.bool,
  href: PropTypes.string,
  icon: PropTypes.string,
  loading: PropTypes.bool,
  shape: PropTypes.oneOf(ButtonShapes),
  size: PropTypes.oneOf(ButtonSizes),
  target: PropTypes.string,
  type: PropTypes.oneOf(ButtonTypes),
  block: PropTypes.bool,
  htmlType: PropTypes.oneOf(ButtonHtmlTypes),
  autoInsertSpaceInButton: PropTypes.bool,
  onClick:PropTypes.func
}

export const defaultProps: IButtonProps = {
  htmlType: 'button',
  autoInsertSpaceInButton: false
}
