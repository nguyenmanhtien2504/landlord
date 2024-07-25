import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import Breadcrumb from '../../components/Common/Breadcrumb'
import RecentTransaction from '../../components/Report/RecentTransaction'
import RecentTransactionAll from '../../components/Report/RecentTransactionAll'
import { useRouter } from "next/router";

const Report = () => {
    const router = useRouter();
    const { id } = router.query;
    if(id === undefined){
        console.log("dfghjksdhfkhasdfjkhasdkfjhsdajkfh")
    } 
    return (
        <>
            <Breadcrumb title='Quản lý hợp đồng' titleText='Chào mừng đến với Bảng quản trị' parent='Quản lý' />
            <Container fluid={true}>
                <Row className="report-summary">
                    <RecentTransaction id={id}/>
                    <RecentTransactionAll id={id}/>
                </Row>
            </Container>
        </>
    )
}

export default Report
