import { Field, Form, Formik } from 'formik'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup';
import { Lock, User } from 'react-feather'
import { Card, CardBody, Col, Container, Row } from 'reactstrap'
import { useRouter } from 'next/router';
import Img from '../../components/Common/Image';
import {  getCookie, setCookie  } from 'cookies-next';

const LogIn = () => {
    const router = useRouter();
    const [showpassword, setShowpassword] = useState(false);
    const [error, setError] = useState('');

    const expires = new Date();
    expires.setDate(expires.getDate() + 1);

    useEffect(() => {
        // Kiểm tra xem có token đã được lưu trong local storage hay chưa
        const storedToken = getCookie('token2');
        if (storedToken) {
          // Xử lý trạng thái đã đăng nhập
          console.log('Người dùng đã đăng nhập!');
          router.push('/agents/profile');
        }
      }, []);

    const handleSubmit = async (e) => {

        // Tạo một đối tượng chứa thông tin đăng nhập
        const loginData = {
          uId: 0,
          fullName: 'string',
          dateofbirth: "",
          address: 'string',
          citizenIdentification: 'string',
          phoneNumber: 'string',
          gender: 'string',
          gmail: 'string',
          avatar: 'string',
          username : e.username,
          password : e.password,
          rId: 0,
          roleName: 'string',
        };

        try {
            // Gửi yêu cầu POST đến API đăng nhập
            const response = await fetch('https://ehouseapi20230817222213.azurewebsites.net/api/User/Login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(loginData),
            });
      
            if (response.ok) {
              // Xử lý đăng nhập thành công
              const responseJson = await response.json();
              const token = responseJson.token; // Giả sử token trả về từ BE được lưu trong thuộc tính "token"
              setCookie('token2', token, {expires});
              console.log('Đăng nhập thành công!');
              router.push('/agents/profile');
            } else {
              // Xử lý đăng nhập thất bại
              setError('Đăng nhập thất bại. Vui lòng kiểm tra lại tên đăng nhập và mật khẩu.');
              alert('Đăng nhập thất bại. Vui lòng kiểm tra lại tên đăng nhập và mật khẩu.')
            }
          } catch (error) {
            console.error('Đã xảy ra lỗi:', error);
            alert('Đã xãy ra lỗi !');
          }
    };

    return (
        <div className="authentication-box">
            <Container fluid={true} className="container-fluid">
                <Row className="log-in">
                    <Col xxl='3' xl='4' lg='5' md='6' sm='8' className="form-login">
                        <Card className="card">
                            <CardBody className="card-body">
                                <div className="title-3 text-start">
                                    <h2>Đăng nhập</h2>
                                </div>
                                <Formik
                                    initialValues={{
                                        username: "",
                                        password: ""
                                    }}
                                    validationSchema={Yup.object().shape({
                                        username: Yup.string().required('Tên đăng nhập là bắt buộc..!'),
                                        password: Yup.string().required('Mật khẩu là bắt buộc..!')
                                    })}
                                    onSubmit={handleSubmit}>
                                    {({ errors, touched }) => (
                                        <Form>
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <div className="input-group-prepend">
                                                        <User size={20} />
                                                    </div>
                                                    <Field type="text" className={`form-control`} name='username' placeholder="Nhập tên đăng nhập" />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <div className="input-group-prepend">
                                                        <Lock size={20} />
                                                    </div>
                                                    <Field type={`${showpassword ? 'text' : 'password'}`} name='password' id="pwd-input" className={`form-control ${(errors.password && touched.password) ? 'is-invalid' : ''}`} placeholder="Nhập mật khẩu" />
                                                    <div className="input-group-apend">
                                                        <i id="pwd-icon" className={`far fa-eye${!showpassword ? '-slash' : ''}`} onClick={() => { setShowpassword(!showpassword) }} />
                                                    </div>
                                                </div>
                                                {(errors.password && touched.password) && <div className='text-danger ms-4'>{errors.password}</div>}
                                                <div className="important-note">
                                                    Mật khẩu phải có tối thiểu 8 ký tự và phải chứa các chữ cái và số
                                                </div>
                                            </div>
                                            <div className="d-flex">
                                                <label className="d-block mb-0" htmlFor="chk-ani">
                                                    <input className="checkbox_animated" id="chk-ani" type="checkbox" /> Ghi nhớ tài khoản mật khẩu
                                                </label>
                                            </div>
                                            <div>
                                                <button type="submit" className="btn btn-gradient btn-pill me-sm-3 me-2">Đăng nhập</button>
                                                <Link href="/authentication/signup" className="btn btn-dashed btn-pill">Đăng kí</Link>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xxl='7' xl='7' lg='6' className="offset-xxl-1 auth-img">
                        <Img src={`/assets/images/svg/2.svg`} alt='' className='bg-img' />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default LogIn

LogIn.getLayout = function getLayout(LogIn) {
    return (
        <>
            {LogIn}
        </>
    )
}