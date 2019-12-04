import * as React from 'react'
import {Carousel} from '@/components'
import './index.scss'

export default ()=>{
  return <div className='play-ground play-ground-carousel'>
<Carousel width={1800} height={360} autoPlay>
  <div style={{background:"#f00",width:600,height:300,border:"1px solid #ddd"}}>1</div>
  <div style={{background:"#fff",width:600,height:300,border:"1px solid #ddd"}}>2</div>
  <div style={{background:"#ccc",width:600,height:300,border:"1px solid #ddd"}}>3</div>
  <div style={{background:"#000",width:600,height:300,border:"1px solid #ddd"}}>4</div>
  <div style={{background:"#ddd",width:600,height:300,border:"1px solid #ddd"}}>5</div>
  <div style={{background:"#f77",width:600,height:300,border:"1px solid #ddd"}}>6</div>
</Carousel>
  </div>
}