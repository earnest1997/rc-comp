import * as PropTypes from 'prop-types'
import { tuple } from '@/utils'

export interface IGutterObject {
  xs?: number
  xm?: number
  sm?: number
  md?: number
  lg?: number
  xl?: number
  xxl?: number
}

export type TGutter =
  | number
  | IGutterObject
  | [number | IGutterObject, number | IGutterObject]

export const RowAligns = tuple('top', 'middle', 'bottom')
export const RowJustifies = tuple(
  'start',
  'end',
  'center',
  'space-around',
  'space-between'
)

export interface IRowProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: (typeof RowAligns)[number]
  gutter?: TGutter
  justify?: (typeof RowJustifies)[number]
}

export const defaultProps = {
  gutter: 0
}

export const propTypes = {
  align: PropTypes.oneOf(RowAligns),
  justify: PropTypes.oneOf(RowJustifies),
  className: PropTypes.string,
  children: PropTypes.node,
  gutter: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number,
    PropTypes.array
  ])
}
