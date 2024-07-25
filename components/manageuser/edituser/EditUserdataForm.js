import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone-uploader";
import { Button, Col, Row } from "reactstrap";
import * as Yup from "yup";
import {
  ReactstrapInput, 
  ReactstrapSelect
} from "../../utils/ReactStarpInputsValidation";
import axios from "axios";
import { getTokenFromCookie } from "../../../pages/api/tokenUtils.js";

const EditUserdataForm = () => {
  const token = getTokenFromCookie();

  const [userlist, setUserlist] = useState({});

  useEffect(() => {
    axios
      .get("https://ehouseapi20230817222213.azurewebsites.net/api/User/LoggedUser", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setUserlist(res.data);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }, []);

  if (userlist && userlist.fullName) {
    return (<Formik
        initialValues={{
          uId: userlist.uId,
          fullName: userlist.fullName,
          dateofbirth: userlist.dateofbirth,
          address: userlist.address,
          citizenIdentification: userlist.citizenIdentification,
          phoneNumber: userlist.phoneNumber,
          gender: userlist.gender,
          gmail: userlist.gmail,
          avatar: userlist.avatar,
          userName: userlist.username,
          password: userlist.password,
          rId: "2",
          roleName: "Lessor",
        }}
        validationSchema={Yup.object().shape({
          fullName: Yup.string().required(),
          dateofbirth: Yup.string().required(),
          address: Yup.string().required(),
          citizenIdentification: Yup.string().required(),
          phoneNumber: Yup.string().required(),
          gender: Yup.string().required()
          .oneOf(["Nam", "Nữ"], "Giới tính không hợp lệ. Chỉ chấp nhận 'Nam' hoặc 'Nữ'."),
          gmail: Yup.string().required(),
          avatar: Yup.string().required(),
          userName: Yup.string().required(),
          password: Yup.string().required(),
        })}
        onSubmit={(values) => {
          console.log(values);
          event.preventDefault();
  
          axios
            .put("https://ehouseapi20230817222213.azurewebsites.net/api/User/UpdateUser", values , {
              headers: {
                  Authorization: token,
              }
            })
            .then((response) => {
              // Xử lý response thành công
              console.log("User updated successfully:", response.data);
              alert('Chỉnh sửa thông tin thành công')
              window.location.reload()
            })
            .catch((error) => {
              // Xử lý lỗi khi request thất bại
              console.error("Error updating user:", error);
              alert('Chỉnh sửa thông tin thất bại')
            });
        }}
        render={() => (
          <Form>
          <Row className="gx-3">
            {/* <Col sm="4" className="form-group">
              <Field
                name="uId"
                type="number"
                component={ReactstrapInput}
                className="form-control"
                placeholder="Nhập ID"
                label="ID"
                readOnly
              />
            </Col> */}
            <Col sm="4" className="form-group">
              <Field
                name="fullName"
                type="text"
                component={ReactstrapInput}
                className="form-control"
                placeholder="Nhập họ và tên"
                label="Họ và tên"
              />
            </Col>
            <Col sm="4" className="form-group">
              <Field
                name="dateofbirth"
                type="text"
                component={ReactstrapInput}
                className="form-control"
                placeholder="Nhập ngày tháng năm sinh"
                label="Ngày tháng năm sinh"
              />
            </Col>
            <Col sm="4" className="form-group">
              <Field
                name="address"
                component={ReactstrapInput}
                type="text"
                className="form-control"
                placeholder="Nhập địa chỉ"
                label="Địa chỉ"
              />
            </Col>
            <Col sm="4" className="form-group">
              <Field
                name="citizenIdentification"
                type="text"
                component={ReactstrapInput}
                className="form-control"
                placeholder="Nhập căn cước công dân"
                label="Căn cước công dân"
              />
            </Col>
            <Col sm="4" className="form-group">
              <Field
                name="phoneNumber"
                type="text"
                component={ReactstrapInput}
                className="form-control"
                placeholder="Nhập số điện thoại"
                label="Số điện thoại"
              />
            </Col>
            <Col sm="4" className="form-group">
              <Field
                name="gender"
                component={ReactstrapSelect}
                className="form-control"
                label="Giới tính"
                inputprops={{ options: ["Nam", "Nữ"],defaultOption: "Giới tính" }}
              />
            </Col>
            <Col sm="4" className="form-group">
              <Field
                name="gmail"
                type="text"
                component={ReactstrapInput}
                className="form-control"
                placeholder="Nhập tên Gmail"
                label="Gmail"
              />
            </Col>
            <Col sm="4" className="form-group">
              <Field
                name="userName"
                component={ReactstrapInput}
                type="text"
                className="form-control"
                placeholder="Nhập tên tài khoản"
                label="Tên tài khoản"
              />
            </Col>
            <Col sm="4" className="form-group">
              <Field
                name="password"
                type="text"
                component={ReactstrapInput}
                className="form-control"
                placeholder="Nhập mật khẩu"
                label="Mật khẩu"
              />
            </Col>
          </Row>
            <div className="dropzone-admin mb-0">
              <Col sm="12" className="form-btn">
                <Button type="submit" className="btn btn-gradient btn-pill">
                  Nộp
                </Button>
                {/* <Button className="btn btn-dashed btn-pill" onClick={(event)=>{
                      event.preventDefault();
                          try {
                               axios.delete(`https://ehouseapi20230817222213.azurewebsites.net/api/User/Delete/${userlist.uId}`,{
                                  headers : {
                                      Authorization: token,
                                  }
                               });
                               alert("Your data is Deleted check console");
                               console.log('User deleted successfully:');
                              // Xử lý thành công - ví dụ: hiển thị thông báo, làm mới danh sách người dùng, vv.
                          }catch(error){
                              // Xử lý lỗi - ví dụ: hiển thị thông báo lỗi
                              console.error('Đã xảy ra lỗi khi xóa người dùng:', error);
                          }
                  }}>Delete</Button> */}
              </Col>
            </div>
          </Form>
        )}
      />)
  } else {
    console.log("Userlist is empty or user.fullName is not available");
  }
};

export default EditUserdataForm;
