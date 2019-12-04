import * as PropTypes from 'prop-types'

export interface IGridResponsiveObject {
  offset?: number
  order?: number
  pull?: number
  push?: number
  span?: number
}

export type TResponsiveItem = number | IGridResponsiveObject

export interface IColProps
  extends IGridResponsiveObject,
    React.HTMLAttributes<HTMLDivElement> {
  xs?: TResponsiveItem
  sm?: TResponsiveItem
  md?: TResponsiveItem
  lg?: TResponsiveItem
  xl?: TResponsiveItem
  xxl?: TResponsiveItem
}

const objectOrNumber = PropTypes.oneOfType([PropTypes.object, PropTypes.number])

export const propTypes = {
  span: PropTypes.number,
  order: PropTypes.number,
  offset: PropTypes.number,
  push: PropTypes.number,
  pull: PropTypes.number,
  className: PropTypes.string,
  children: PropTypes.node,
  xs: objectOrNumber,
  sm: objectOrNumber,
  md: objectOrNumber,
  lg: objectOrNumber,
  xl: objectOrNumber,
  xxl: objectOrNumber
}

export const defaultProps = {}
