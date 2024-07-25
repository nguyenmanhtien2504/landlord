import Link from 'next/link'
import React from 'react'
import { Col, Container, Row } from 'reactstrap'

const index = () => {
    return (
        <>
            <div className="page-not-found">
                <Container fluid={true}>
                    <Row>
                        <Col lg='6' md='8' sm='10'>
                            <div className="not-found-img">
                                <img src="/assets/images/svg/3.svg" className="img-fluid" alt='' />
                                <div className="animation-error">
                                    <img src="/assets/images/svg/error.svg" className="img-fluid" alt='' />
                                </div>
                            </div>
                        </Col>
                        <Col lg='6' md='8' sm='10'>
                            <div className="not-found-content">
                                <h2>Xin lỗi...Trang này bạn tìm không tồn tại.</h2>
                                <p className="font-roboto light-font">Chúng tôi xin lỗi vì sự cố này!</p>
                                <div className="btns">
                                    <Link href="/dashboard" className="btn btn-pill btn-gradient">
                                        Tới trang chủ
                                    </Link>
                                    <Link href="/authentication/404" className="btn btn-pill btn-dashed ms-2">
                                        Báo cáo đến quản trị viên
                                    </Link>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

        </>
    )
}

export default index

index.getLayout = function getLayout(index) {
    return (
        <>
            {index}
        </>
    )
}