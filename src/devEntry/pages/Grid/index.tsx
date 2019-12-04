import * as React from 'react'
import { Grid } from '@/components'
import './index.scss'

const { Row, Col } = Grid

export default () => {
  return (
    <div className='play-ground play-ground-grid'>
      <h2>24 列</h2>
      <Row>
        {Array(24)
          .fill('')
          .map((_, index) => (
            <Col span={1} key={index}>
              <div className='col-inner'></div>
            </Col>
          ))}
      </Row>
      <hr />
      <h2>等分</h2>
      <Row gutter={[0, 24]}>
        <Col span={6}>
          <div className='col-inner'>col-6</div>
        </Col>
        <Col span={6}>
          <div className='col-inner'>col-6</div>
        </Col>
        <Col span={6}>
          <div className='col-inner'>col-6</div>
        </Col>
        <Col span={6}>
          <div className='col-inner'>col-6</div>
        </Col>
      </Row>
      <Row gutter={[0, 24]}>
        <Col span={8}>
          <div className='col-inner'>col-8</div>
        </Col>
        <Col span={8}>
          <div className='col-inner'>col-8</div>
        </Col>
        <Col span={8}>
          <div className='col-inner'>col-8</div>
        </Col>
      </Row>
      <hr />
      <h2>间距</h2>
      <Row gutter={[32, 24]}>
        <Col span={6}>
          <div className='col-inner'>col-6</div>
        </Col>
        <Col span={6}>
          <div className='col-inner'>col-6</div>
        </Col>
        <Col span={6}>
          <div className='col-inner'>col-6</div>
        </Col>
        <Col span={6}>
          <div className='col-inner'>col-6</div>
        </Col>
      </Row>
      <Row gutter={[64, 24]}>
        <Col span={6}>
          <div className='col-inner'>col-6</div>
        </Col>
        <Col span={6}>
          <div className='col-inner'>col-6</div>
        </Col>
        <Col span={6}>
          <div className='col-inner'>col-6</div>
        </Col>
        <Col span={6}>
          <div className='col-inner'>col-6</div>
        </Col>
      </Row>
      <hr />
      <h2>响应式</h2>
      <Row gutter={[0, 24]}>
        <Col xs={2} sm={4} md={6} lg={8} xl={10}>
          <div className='col-inner'>col</div>
        </Col>
        <Col xs={20} sm={16} md={12} lg={8} xl={4}>
          <div className='col-inner'>col</div>
        </Col>
        <Col xs={2} sm={4} md={6} lg={8} xl={10}>
          <div className='col-inner'>col</div>
        </Col>
      </Row>
      <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32, xl: 50, xxl: 48 }, 24]}>
        <Col span={6}>
          <div className='col-inner'>col</div>
        </Col>
        <Col span={6}>
          <div className='col-inner'>col</div>
        </Col>
        <Col span={6}>
          <div className='col-inner'>col</div>
        </Col>
        <Col span={6}>
          <div className='col-inner'>col</div>
        </Col>
      </Row>
      <hr />
      <h2>占位</h2>
      <Row gutter={[0, 24]}>
        <Col span={6}>
          <div className='col-inner'>col-6</div>
        </Col>
        <Col span={6} offset={6}>
          <div className='col-inner'>col-6 col-offset-6</div>
        </Col>
        <Col span={6}>
          <div className='col-inner'>col-6</div>
        </Col>
      </Row>
      <Row gutter={[0, 24]}>
        <Col span={6}>
          <div className='col-inner'>col-6</div>
        </Col>
        <Col span={6} offset={3}>
          <div className='col-inner'>col-6 col-offset-3</div>
        </Col>
        <Col span={6} offset={3}>
          <div className='col-inner'>col-6 col-offset-3</div>
        </Col>
      </Row>
      <hr />
      <h2>偏移</h2>
      <Row>
        <Col span={18} push={6}>
          <div className='col-inner'>col-18 pos-1 col-push-6</div>
        </Col>
        <Col span={6} pull={18}>
          <div className='col-inner'>col-6 pos-2 col-pull-18</div>
        </Col>
      </Row>
      <hr />
      <h2>排序</h2>
      <Row>
        <Col span={6} order={4}>
          <div className='col-inner'>col-6 pos-1 col-order-4</div>
        </Col>
        <Col span={6} order={3}>
          <div className='col-inner'>col-6 pos-2 col-order-3</div>
        </Col>
        <Col span={6} order={2}>
          <div className='col-inner'>col-6 pos-3 col-order-2</div>
        </Col>
        <Col span={6} order={1}>
          <div className='col-inner'>col-6 pos-4 col-order-1</div>
        </Col>
      </Row>
      <hr />
      <h2>水平对齐</h2>
      <h3>justify: start</h3>
      <Row>
        <Col span={6}>
          <div className='col-inner'>col-6</div>
        </Col>
        <Col span={6}>
          <div className='col-inner'>col-6</div>
        </Col>
        <Col span={6}>
          <div className='col-inner'>col-6</div>
        </Col>
      </Row>
      <h3>justify: end</h3>
      <Row justify='end'>
        <Col span={6}>
          <div className='col-inner'>col-6</div>
        </Col>
        <Col span={6}>
          <div className='col-inner'>col-6</div>
        </Col>
        <Col span={6}>
          <div className='col-inner'>col-6</div>
        </Col>
      </Row>
      <h3>justify: center</h3>
      <Row justify='center'>
        <Col span={6}>
          <div className='col-inner'>col-6</div>
        </Col>
        <Col span={6}>
          <div className='col-inner'>col-6</div>
        </Col>
        <Col span={6}>
          <div className='col-inner'>col-6</div>
        </Col>
      </Row>
      <h3>justify: space-around</h3>
      <Row justify='space-around'>
        <Col span={6}>
          <div className='col-inner'>col-6</div>
        </Col>
        <Col span={6}>
          <div className='col-inner'>col-6</div>
        </Col>
        <Col span={6}>
          <div className='col-inner'>col-6</div>
        </Col>
      </Row>
      <h3>justify: space-between</h3>
      <Row justify='space-between'>
        <Col span={6}>
          <div className='col-inner'>col-6</div>
        </Col>
        <Col span={6}>
          <div className='col-inner'>col-6</div>
        </Col>
        <Col span={6}>
          <div className='col-inner'>col-6</div>
        </Col>
      </Row>
      <hr />
      <h2>垂直对齐</h2>
      <h3>align: top</h3>
      <Row>
        <Col span={6}>
          <div className='col-inner'>col-6</div>
        </Col>
        <Col span={6}>
          <div className='col-inner' style={{ height: 120 }}>
            col-6
          </div>
        </Col>
        <Col span={6}>
          <div className='col-inner'>col-6</div>
        </Col>
        <Col span={6}>
          <div className='col-inner' style={{ height: 120 }}>
            col-6
          </div>
        </Col>
      </Row>
      <h3>align: middle</h3>
      <Row align='middle'>
        <Col span={6}>
          <div className='col-inner'>col-6</div>
        </Col>
        <Col span={6}>
          <div className='col-inner' style={{ height: 120 }}>
            col-6
          </div>
        </Col>
        <Col span={6}>
          <div className='col-inner'>col-6</div>
        </Col>
        <Col span={6}>
          <div className='col-inner' style={{ height: 120 }}>
            col-6
          </div>
        </Col>
      </Row>
      <h3>align: bottom</h3>
      <Row align='bottom'>
        <Col span={6}>
          <div className='col-inner'>col-6</div>
        </Col>
        <Col span={6}>
          <div className='col-inner' style={{ height: 120 }}>
            col-6
          </div>
        </Col>
        <Col span={6}>
          <div className='col-inner'>col-6</div>
        </Col>
        <Col span={6}>
          <div className='col-inner' style={{ height: 120 }}>
            col-6
          </div>
        </Col>
      </Row>
    </div>
  )
}
