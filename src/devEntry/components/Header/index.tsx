import * as React from 'react'
import { NavLink } from 'react-router-dom'
import './index.scss'

interface IHeaderProps {
  data: Array<{
    name: string
  }>
}

export const Header = ({ data }: IHeaderProps) => {
  return (
    <header className='dev-header'>
      {data.map(({ name }, index) => (
        <NavLink to={`/${name}`} key={index}>
          {name}
        </NavLink>
      ))}
    </header>
  )
}
