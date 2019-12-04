import * as React from 'react'
import { Button } from '@/components'
import './index.scss'

const btnRef=React.createRef<HTMLAnchorElement & HTMLButtonElement>()

const { Group } = Button
export default () => (
  <div className='play-ground play-ground-button'>
    <div className='section-01'>
      <h4>按钮类型</h4>
      <Button type='primary'>Primary</Button>
      <Button>default</Button>
      <Button type='dashed'>Dashed</Button>
      <Button type='danger'>Danger</Button>
      <Button type='link'>Link</Button>
    </div>
    <div className='section-02'>
      <h4>按钮尺寸</h4>
      <Button size='small'>small</Button>
      <Button size='large'>large</Button>
    </div>
    <div className='section-03'>
      <h4>不可用状态</h4>
      <Button type='primary'>Primary</Button>
      <Button type='primary' disabled ghost>
        Primary(disabled)
      </Button>
      <br />
      <Button>Default</Button>
      <Button disabled ref={btnRef}>Default(disabled)</Button>
      <Button type='danger'>Danger</Button>
      <Button type='danger' disabled ghost>
        Danger(disabled)
      </Button>
      <Button type='dashed'>Dashed</Button>
      <Button type='dashed' disabled ghost>
        Dashed(disabled)
      </Button>
      <Button type='link'>Link</Button>
      <Button type='link' disabled ghost>
        Link(disabled)
      </Button>
    </div>
    <div className='section-04'>
      <h4>按钮形状</h4>
      <Button shape='circle'>圆</Button>
      <Button shape='round' type='danger'>椭圆</Button>
    </div>
    <div className='section-05'>
      <h4>加载中状态</h4>
    </div>
    <div className='section-06'>
      <h4>按钮组合</h4>
      <div className='group-wrapper'>
      <Group type='primary' style={{ color: '#000' }} className='test' ghost>
        <Button type='danger'>测试</Button>
        <Button type='primary' ghost={false}>
          Primary
        </Button>
        <Button className='test' ghost={false}>
          测试2
        </Button>
      </Group>
      <Group type='danger' size='small'>
      <Button>测试3</Button>
        <Button disabled>测试4</Button>
        <Button ghost>测试5</Button>
      </Group>
      </div>
    </div>
    <div className='section-07'>
      <h4>幽灵按钮</h4>
      <div style={{ backgroundColor: 'rgb(190, 200, 200)' }}>
        <Button type='primary' ghost>
          Primary
        </Button>
        <Button ghost>default</Button>
        <Button type='dashed' ghost>
          Dashed
        </Button>
        <Button type='danger' ghost>
          Danger
        </Button>
        <Button type='link' ghost>
          Link
        </Button>
      </div>
    </div>
    <div className='section-08'>
      <h4>block按钮</h4>
      <div style={{ width: 400, height: 40 }}>
        <Button type='danger' block>
          等宽按钮
        </Button>
      </div>
    </div>
    <div className='section-09'>
      <h4>图标按钮</h4>
      <div>
        {/* <Button type='primary'></Button> */}
      </div>
    </div>
  </div>
)
