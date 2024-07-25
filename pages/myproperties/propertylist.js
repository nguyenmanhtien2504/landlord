import React from 'react'
import { Col, Container, Input, Label, Row } from 'reactstrap'
import Breadcrumb from '../../components/Common/Breadcrumb'
import Listview from '../../components/myproperties/PropertyList/Listview'

const Propertylist = () => {
  return (
    <>
      <Breadcrumb title='Danh sách nhà' titleText='Chào mừng đến với Bảng quản trị' parent='Tài sản' />
      <Container fluid={true}>
        <Row>
          <Col lg='12'>
            <div className='property-admin'>
              <div className="property-section section-sm">
                <Row className='ratio_55 property-grid-2 property-map map-with-back'>
                  <Listview />
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Propertylist