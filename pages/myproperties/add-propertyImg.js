import React from 'react'
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap'
import Breadcrumb from '../../components/Common/Breadcrumb';
import AddPropertyFormImg from '../../components/myproperties/addProperty/AddPropertyFormImg';

const AddProperty = () => {
    return (
        <>
            <Breadcrumb title='Thêm chi tiết ' titleText='Chào mừng đến với Bảng quản trị' parent='Tạo mới' />
            <Container fluid={true} className="container-fluid">
                <Row>
                    <Col lg='12'>
                        <Card className="card">
                            <CardHeader className="card-header pb-0">
                                <h5>Thêm chi tiết </h5>
                            </CardHeader>
                            <CardBody className="card-body admin-form">
                                <AddPropertyFormImg />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>

        </>
    )
}

export default AddProperty