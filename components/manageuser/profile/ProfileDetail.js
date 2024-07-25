import Link from 'next/link'
import React, { useEffect, useState } from "react";
// import { ChevronRight } from 'react-feather'
import { Button, Card, CardBody, Col, Media } from 'reactstrap'
// import { Monthlydata, Projectimg } from '../../../data/manage-profile/profiledata'
import axios from 'axios';
import {getTokenFromCookie } from '../../../pages/api/tokenUtils.js'

const ProfileDetail = () => {

    const [UserProfile1, setUserProfile1] = useState({});

    useEffect(() => {
      const token = getTokenFromCookie();
  
      axios.get('https://ehouseapi20230817222213.azurewebsites.net/api/User/LoggedUser', {
        headers: {
          Authorization: token,
        }
      })
        .then((response) => {
          const newUserProfile1 = response.data;
          setUserProfile1(newUserProfile1);
          console.log('UserProfile1 sau khi cập nhật:', newUserProfile1);
        })
        .catch((error) => {
          console.error('Error:', error);
          // Xử lý lỗi nếu cần thiết
        });
    }, []);

    return (
        <>
            <Col xl='5 xl-6'>
                <Card>
                    <CardBody >
                        <Media className="contact-media">
                            <img src={UserProfile1.avatar} className="img-fluid img-80" alt='' />
                            <Media body>
                                <h4>{`Xin chào, bạn ${UserProfile1.fullName}`}</h4>
                                <span className="light-font">Địa chỉ của bạn <a>{UserProfile1.address}</a></span>
                                <ul className="agent-social mt-2">
                                    <li><Link href="https://www.facebook.com/" className="facebook"><i className="fab fa-facebook-f" /></Link></li>
                                    <li><Link href="https://twitter.com/" className="twitter"><i className="fab fa-twitter" /></Link></li>
                                    <li><Link href="https://account.google.com" className="google"><i className="fab fa-google" /></Link></li>
                                    <li><Link href="https://www.linkedin.com/" className="linkedin"><i className="fab fa-linkedin-in" /></Link></li>
                                </ul>
                            </Media>
                        </Media>
                        <div className="contact-btn">
                            <Link href='/manage-users/allusers' className="btn btn-gradient btn-pill">Email</Link>
                            <Link href='/manage-users/add-user' className="btn btn-dashed ms-2 btn-pill">Message</Link>
                        </div>
                    </CardBody>
                </Card>
            </Col>
            {/* <Col xl='4 xl-6'>
                <Card>
                    <CardBody>
                        <div className="partner-info">
                            <div className="title-about">
                                <h5>Project meetings</h5>
                            </div>
                            <div className="time-details">
                                <div>
                                    <ul>
                                        {
                                            Projectimg && Projectimg.map((item, i) => {
                                                return (
                                                    <li key={i}>
                                                        <img src={item.img} className="img-fluid" alt='' />
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                    <Link href='/manage-users/allusers'>Join now <ChevronRight /></Link>
                                </div>
                                <div>
                                    <h6>4:00 - 5:00 PM</h6>
                                    <span className="label label-light-danger">10 mins left</span>
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Col>
            <Col xl='3 xl-6'>
                <Card className="timeline-card">
                    <CardBody>
                        <div className="partner-info">
                            <div className="title-about">
                                <h5>Monthly installment</h5>
                            </div>
                            <div className="timeline-pay">
                                <ul>
                                    {
                                        Monthlydata && Monthlydata.map((item, i) => {
                                            return (
                                                <li key={i} className={item.class ? item.class : ''}>
                                                    <div>
                                                        <i className="fas fa-check-circle" />
                                                        <span>{item.time}</span>
                                                    </div>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                                <div className="timeline-right">
                                    <h5 className="mb-0">$4.500</h5>
                                    <Link href='/agents/invoice'>View Details</Link>
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Col> */}
        </>
    )
}
export default ProfileDetail
