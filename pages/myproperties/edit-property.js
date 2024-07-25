import React from 'react'
import { Card, CardBody, CardHeader, Col, Container, Form, Row } from 'reactstrap'
import Breadcrumb from '../../components/Common/Breadcrumb'
import EditPropertyForm from '../../components/myproperties/editProperty/EditPropertyForm'

const EditProperty = () => {
    return (
        <>
            <Breadcrumb title='Chỉnh sửa tài sản' titleText='Chào mừng đến với Bảng quản trị' parent='Chỉnh sửa' />
            <Container fluid={true}>
                <Row>
                    <Col lg='12'>
                        <Card className="card">
                            <CardHeader className="card-header pb-0">
                                <h5>Chỉnh sửa tài sản chi tiết</h5>
                            </CardHeader>
                            <CardBody className="card-body admin-form">
                                <EditPropertyForm />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>

        </>
    )
}

export default EditProperty