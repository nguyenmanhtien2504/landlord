import React from 'react'
import { Card, CardBody, Table } from 'reactstrap'

const About = ({ Aboutdata }) => {
    return (
        <Card>
            <CardBody>
                <div className="title-about">
                    <h5>Thông tin</h5>
                </div>
                <div className="table-responsive">
                    <Table className="table-bordernone mb-0">
                        <tbody>
                           
                            <tr>
                                <td className="pt-0">Email:</td>
                                <td className="light-font pt-0">{Aboutdata.gmail}</td>
                            </tr>
                            <tr>
                                <td>Số điện thoại:</td>
                                <td className="light-font">{Aboutdata.phoneNumber}</td>
                            </tr>
                            <tr>
                                <td>Giới tính:</td>
                                <td className="light-font">{Aboutdata.gender}</td>
                            </tr>
                            <tr>
                                <td className="pb-0">Ngày sinh:</td>
                                <td className="light-font pb-0">{Aboutdata.dateofbirth}</td>
                            </tr>
                            

                        </tbody>
                    </Table>
                </div>
            </CardBody>
        </Card>
    )
}

export default About