import Link from 'next/link'
import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, Col, Media } from 'reactstrap'
import axios from 'axios';
import {getTokenFromCookie } from '../../../pages/api/tokenUtils.js'
import { getCookie } from 'cookies-next';

const ProfileDetail = () => {

    const [UserProfile2, setUserProfile2] = useState({});

    const leId = getCookie('lessorId');

    useEffect(() => {
      const token = getTokenFromCookie();
  
      axios.get('https://ehouseapi20230817222213.azurewebsites.net/api/User/LoggedUser', {
        headers: {
          Authorization: token,
        }
      })
        .then((response) => {
          const newUserProfile2 = response.data;
          setUserProfile2(newUserProfile2);
        })
        .catch((error) => {
          console.error('Error:', error);
          // Xử lý lỗi nếu cần thiết
        });
    }, []);

    return (
        <Col xl='5 xl-6'>
            <Card>
                <CardBody>
                    <Media className="contact-media">
                        <img src={UserProfile2.avatar} className="img-fluid img-80" alt='' />
                        <Media body>
                        <h4>{`Xin chào, bạn ${UserProfile2.fullName}`}</h4>
                            <span className="light-font">Địa chỉ của bạn <a href='#' className='font-theme'>{UserProfile2.address}</a></span>
                            <ul className="agent-social mt-2">
                                <li><Link href="https://www.facebook.com/" className="facebook"><i className="fab fa-facebook-f" /></Link></li>
                                <li><Link href="https://twitter.com/" className="twitter"><i className="fab fa-twitter" /></Link></li>
                                <li><Link href="https://account.google.com" className="google"><i className="fab fa-google" /></Link></li>
                                <li><Link href="https://www.linkedin.com/" className="linkedin"><i className="fab fa-linkedin-in" /></Link></li>
                            </ul>
                        </Media>
                    </Media>
                    <div className="contact-btn">
                        <Link href='/agents/edit-agent' className="btn btn-gradient btn-pill">Chỉnh sửa thông tin</Link>
                        <Link href='/myproperties/propertylist' className="btn btn-dashed ms-2 btn-pill">Xem tài sản</Link>
                        <Link href={`/reports?id=${leId}`} className="btn btn-dashed ms-2 btn-pill">Xem hợp đồng</Link>
                    </div>
                </CardBody>
            </Card>
        </Col>
    )
}

export default ProfileDetail