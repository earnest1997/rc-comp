import * as React from 'react'
import { FilterImg } from '@/components'
import './index.scss'

export default () => (
  <div className='play-ground play-ground-filter-img'>
    <FilterImg
      imgSrc01='https://i1.mifile.cn/f/i/2019/mitv5/e55/part12-2.jpg'
      imgSrc02='https://i1.mifile.cn/f/i/2019/mitv5/e55/part12-1.jpg'
      width={1800}
      velocity={210}
    />
  </div>
)
