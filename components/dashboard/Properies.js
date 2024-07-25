import Link from 'next/link'
import React, { useEffect, useState } from "react";
import { ChevronRight } from 'react-feather'
import { Card, CardBody, CardHeader, Col, Media, Row } from 'reactstrap'
import { getTokenFromCookie } from "../../pages/api/tokenUtils.js";
import axios from "axios";


const Properies = ({leId}) => {

    const [properties, setProperties] = useState({});
    const [value, setValue] = useState({});


    const token = getTokenFromCookie();
    console.log(leId);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://ehouseapi20230817222213.azurewebsites.net/api/Contract/CountContractByLessorId?id=${leId}` ,{
                        headers: { 
                            Authorization: token,
                        } 
                    }
                );
                setProperties(response.data); // Thêm .data vào response

                const response1 = await axios.get(
                    `https://ehouseapi20230817222213.azurewebsites.net/api/HouseRent/CountHouseRentByLessorId?id=${leId}` ,{
                        headers: { 
                            Authorization: token,
                        } 
                    }
                );
                setValue(response1.data); // Thêm .data vào response
 
            } catch (error) { 
                console.log(error); 
            }
        };
        fetchData(); 
    }, []);
    return (
        <Col xl='4 large-12'>
            <Row>
                    
                <Col lg='12 large-6' md='6'>
                    <Card className="all-properties">
                        <CardHeader className="pb-0">
                            <div>
                                <h5>Thống kê</h5>
                            </div>
                        </CardHeader>
                        <CardBody>
                            <Media className="media">
                                <img src="/assets/images/svg/icon/1.svg" className="img-fluid" alt='' />
                            </Media>
                            <ul className="light-box">
                                <li>
                                    
                                    <div>
                                    <h5 className="font-success">{properties.num}</h5>
                                    <h6 className="light-font mb-0">Hợp đồng thuê nhà</h6>
                                    </div>
                                </li>
                                <li>
                                    
                                    <div>
                                    <h5 className="font-success"> {value.num} Căn</h5>
                                    <h6 className="light-font mb-0">Tổng số căn nhà</h6>
                                    </div>
                                </li>
                            </ul>
                        </CardBody>
                    </Card>
                </Col>
                
            </Row>
        </Col>

    )
}

export default Properies