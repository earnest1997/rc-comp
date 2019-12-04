import * as PropTypes from 'prop-types'

export type columnType = {
  title:string,
  dataIndex:number,
  key:string,
  render?:(val:any)=>void
}
export interface ITableProps extends React.HTMLAttributes<HTMLTableElement> { 
  data:any[],
  columns: columnType[]
}

export const propTypes = {
  data:PropTypes.array,
  columns:PropTypes.object
}


