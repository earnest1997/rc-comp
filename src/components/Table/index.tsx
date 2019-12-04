import React from 'react'
import classNames from 'classnames'
import { getPrefixCls } from '@/utils'
import { ITableProps,propTypes} from './type'
import './index.scss'

const prefixCls = getPrefixCls('table')
export const Table = ({ data, columns, className, ...restProps }:ITableProps ) => {
  const tableCls = classNames(className, prefixCls)
  return (
    <table className={tableCls} {...restProps}>
      <Thead columns={columns} />
      <Tbody columns={columns} data={data} />
    </table>
  )
}

Table.defaultProps = {
  data: [],
  columns: []
}

function Thead({ columns }:Partial<ITableProps>) {
  return (
    <thead className={`${prefixCls}-thead`}>
      <tr>
        {columns!.map(({ title } , index) => (
          <th className={`${prefixCls}-thead-item`} key={`head-${index}`}>
            {title}
          </th>
        ))}
      </tr>
    </thead>
  )
}

function Tbody({ data, columns }:ITableProps) {
  return (
    <tbody className={`${prefixCls}-tbody`}>
      {data.map((item, i) => (
        <tr className={`${prefixCls}-trow`} key={`body-${i}`}>
          {columns.map(({ dataIndex, render = '' }, index) => (
            <td className={`${prefixCls}-tcell`} key={`cell-${index}`}>
              {typeof render === 'function'
                ? render(item[dataIndex])
                : item[dataIndex]}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  )
}

Table.displayName = 'Table'

Table.propType=propTypes