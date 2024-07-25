import { VectorMap } from '@south-paw/react-vector-maps';
import React from 'react'
import { Container } from 'reactstrap';
import Breadcrumb from '../../components/Common/Breadcrumb';
import india from '../../data/map/india.json';
import world from '../../data/map/world.json';
import usa from '../../data/map/usa.json';
import australia from '../../data/map/australia.json';
import Mapo from '../../components/map/Mapo';

const Map = () => {
    return (
        <>
            <Breadcrumb title='Bản đồ' titleText='Chào mừng đến với Bảng quản trị' parent='Bản đồ' />
            <Container fluid={true}>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-header pb-0">
                                <h5>Bản đồ địa điểm cho thuê</h5>
                            </div>
                            <div className="card-body">
                                <Mapo />
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default Map