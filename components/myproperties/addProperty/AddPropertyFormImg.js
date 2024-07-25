import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone-uploader";
import {
  Button,
  Col,
  Row
} from "reactstrap";

import * as Yup from "yup";
import {
  ReactstrapInput
} from "../../utils/ReactStarpInputsValidation";
import axios from "axios";
import { useRouter } from "next/router";
import { getTokenFromCookie } from "../../../pages/api/tokenUtils.js";

const AddPropertyFormImg = () => {
  const router = useRouter();
  const { name } = router.query;
  const [dataLoaded, setDataLoaded] = useState(false);
  const token = getTokenFromCookie();
  const [houseRentName1, setHouseRentName1] = useState({});

  let name1 = name;

  const onSubmitHandler = async (values, actions) => {
    try {
      const formData = new FormData();
      formData.append("file", values.file);

      // Thêm các trường khác vào dữ liệu form
      formData.append("hoId", values.hoId);
      formData.append("houseRentName", values.houseRentName);

      // Thực hiện yêu cầu API sử dụng axios
      const response = await axios.post(
        `https://ehouseapi20230817222213.azurewebsites.net/api/File/UploadFileForHouseRent?hoid=${values.hoId}`,
        formData,
        {
          headers: {
            accept: "*/*",
            "Content-Type": "multipart/form-data",
            Authorization: token, // Giả sử bạn có một mã thông báo hợp lệ
          },
        }
      );

      // Xử lý phản hồi theo nhu cầu
      if (!response.data) {
        // Show an alert to the user
        alert("lỗi Sever upload ảnh");
      } else {
        // Handle the response as needed
        if (window.confirm("Tải ảnh nhà thành công. Bạn có muốn ở lại trang?")) {
          alert('Hãy xóa ảnh cũ trước khi thêm ảnh mới')
        } else {
          localStorage.removeItem("dataHouseList");
          router.push(`/myproperties/propertylist`);
        }
      }

      // Đặt lại biểu mẫu sau khi gửi thành công
      actions.resetForm();
    } catch (error) {
      console.log("Error uploading file:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () =>{
        try {
            const response = await axios.get("https://ehouseapi20230817222213.azurewebsites.net/api/HouseRent/GetHouseRentsIdByName?houseRentName=" + name1, );
            setHouseRentName1(response.data)
            console.log(houseRentName1)
            setDataLoaded(true)
        } catch (error) {
            console.log(error);
        }
    };
    fetchData();
},[name]);

  if (dataLoaded) {
    if (houseRentName1 && houseRentName1.hoId) {
      return (
        <Formik
          initialValues={{
            hoId: houseRentName1.hoId ,
            houseRentName: houseRentName1.houseRentName,
          }}
          validationSchema={Yup.object().shape({
            hoId : Yup.string().required(),
            houseRentName: Yup.string().required(),

          })}
          onSubmit={onSubmitHandler}

          render={({setFieldValue }) => (
            <Form>
              <Row className="gx-3">
                <Col sm="6" className="form-group">
                  <Field
                    name="hoId"
                    type="number"
                    component={ReactstrapInput}
                    className="form-control"
                    label="ID nhà"
                    readOnly
                  />
                </Col>
              </Row>
              <Row className="gx-3">
                <Col sm="6" className="form-group">
                  <Field
                    name="houseRentName"
                    type="text"
                    component={ReactstrapInput}
                    className="form-control"
                    label="Tên nhà"
                    readOnly
                  />
                </Col>
              </Row>
              <div className="dropzone-admin form-inputs">
                <h6>Media</h6>
                <div className="dropzone" id="multiFileUpload">
                  <div className="dz-message needsclick">
                    <i className="fas fa-cloud-upload-alt" />
                    <Dropzone
                      maxFiles={1}
                      multiple={false}
                      canCancel={false}
                      inputContent="Cho ảnh vào đây"
                      accept="image/*,audio/*,video/*"
                      styles={{
                        dropzoneActive: { borderColor: "green" },
                      }}
                      onChangeStatus={(file, status) => {
                        if (status === "done") {
                          setFieldValue("file", file.file);
                        }}}
                    />
                  </div>
                </div>
                <Row className="gx-3">
                  <Col sm="12" className="form-group mb-0"></Col>
                  <Col sm="12" className="form-btn">
                    <Button type="submit" className="btn btn-gradient btn-pill">
                      Tạo
                    </Button>
                  </Col>
                </Row>
              </div>
            </Form>
          )}
        />
      );
    } else {
      console.log("house rent is empty or not available");
    }
  } else {
    return <p>Loading...</p>;
  }
  return null;
};

export default AddPropertyFormImg;
