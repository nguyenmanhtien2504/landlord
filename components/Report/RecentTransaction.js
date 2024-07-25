import React, { useEffect, useState } from "react";
import {  FileText, Link, CheckSquare } from "react-feather";
import { Card, CardBody, CardHeader, Col, Media, Table } from "reactstrap";
import axios from "axios"; // Thêm import này
import {
  Button,
  Form,
  FormGroup,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { getTokenFromCookie } from "../../pages/api/tokenUtils.js";

const RecentTransaction = ({ id }) => {
  const [contractData, setcontractData] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const token = getTokenFromCookie();

  const actionsCellStyle = {
    cursor: "pointer", // Đổi con trỏ chuột thành bàn tay trỏ
  };
  console.log(id);

  useEffect(() => {
    const storedData = localStorage.getItem("contractData");
    if (storedData) {
      setcontractData(JSON.parse(storedData));
    }
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://ehouseapi20230817222213.azurewebsites.net/api/Contract/GetContractsByLessorIdAndStutasLessorId?id=${id}&StatusLessorId=false`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setcontractData(response.data); // Thêm .data vào response
        localStorage.setItem("contractData", JSON.stringify(response.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  const handleActionsClick = async (item) => {
    item.statusLessorId = true;
    console.log(item);
    try {
      const response = await fetch(
        "https://ehouseapi20230817222213.azurewebsites.net/api/Contract/UpdateContract",
        {
          method: "PUT",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(item),
        }
      );
      const responseText = await response.text();

      if (response.ok) {
        if (responseText === "SUCCESS") {
          alert("Bạn đã duyệt thành công nhà thuê !");
          console.log("Update đăng kí thuê nhà thành công");
          localStorage.removeItem("contractData");
          window.location.reload();
        } else {
          // Handle other responses if needed
          alert("Bạn đã duyệt không thành công nhà thuê");
          console.log("Update đăng kí thuê nhà không thành công");
        }
      } else {
        // Xử lý đăng nhập thất bại
        alert("Bạn đã duyệt không thành công nhà thuê!");
      }
    } catch (error) {
      alert("Bạn đã duyệt không thành công nhà thuê, lỗi sever");
      console.error("Đã xảy ra lỗi:", error);
    }
  };

  const handleLinkClick = (item) => {
    const url = "https://ehomesystem.vercel.app/property/image-slider?id=" + item.hoId;
    window.open(url);
  };

  const handleViewClick = (item) => {
    setSelectedItem(item);
    setModal(true);
  };

  console.log(contractData);
  const numberWithCommas = (number) => {
    return number.toLocaleString();
  };

  return (
    <Col sm="12">
      <Card className="card">
        <CardHeader className="card-header pb-0">
          <h5>Hợp đồng chưa ký</h5>
        </CardHeader>
        <CardBody className="card-body report-table">
          <div className="table-responsive transactions-table">
            {/* {contractData.length !== 0 ? ( */}
            <Table className="table table-bordernone m-0">
              <thead>
                <tr>
                  <th className="light-font">ID nhà</th>
                  <th className="light-font">Tên nhà</th>
                  {/* <th className="light-font">Type</th> */}
                  {/* <th className="light-font">Amount</th> */}
                  <th className="light-font">Giá nhà</th>
                  <th className="light-font">Ngày tạo đơn</th>
                  <th className="light-font">Trạng thái</th>
                  <th className="light-font">Chấp nhận</th>
                  <th className="light-font">Link</th>
                  <th className="light-font">Tổng quan</th>
                </tr>
              </thead>
              <tbody>
                {contractData &&
                  contractData.map((item, i) => {
                    const datePart = item.contractCreatedDay;
                    return (
                      <tr key={i}>
                        <td>{item.hoId}</td>
                        <td>
                          <Media className="media">
                            {/* <img src={item.img} className="img-fluid img-80" alt='' /> */}
                            <Media body className="media-body">
                              <h6>{item.houseRentName}</h6>
                              {/* <span className="light-font">{item.country}</span> */}
                            </Media>
                          </Media>
                        </td>
                        {/* <td>{item.type}</td> */}
                        {/* <td>{item.amount}</td> */}
                        <td>{numberWithCommas(item.rentPrice)} VND</td>
                        <td>{datePart}</td>
                        <td>
                          <span className={`label badge-light-danger`}>
                            {item.statusLessorId ? "Hoàn thành" : "Chờ duyệt"}
                          </span>
                        </td>
                        <td style={actionsCellStyle}>
                          <CheckSquare
                            className="light-font"
                            onClick={() => handleActionsClick(item)}
                          />
                        </td>
                        <td style={actionsCellStyle}>
                          <Link
                            className="light-font"
                            onClick={() => handleLinkClick(item)}
                          />
                        </td>
                        <td style={actionsCellStyle}>
                          <FileText
                            className="light-font"
                            onClick={() => handleViewClick(item)}
                          />
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
            {/* // ) :( 
                            //                 <td>
                            //                     Hiện không có dữ liệu để xem sét đơn
                            //                 </td>
                            //             )} */}
          </div>
          <Modal isOpen={modal} toggle={() => setModal(!modal)}>
            <ModalHeader ModalHeader>
              <strong>Thông tin hợp đồng</strong>
            </ModalHeader>
            <ModalBody>
              {selectedItem && (
                <>
                  <p className="m-1">Tên nhà : {selectedItem.houseRentName}</p>
                  <br />
                  <p className="m-1">
                    Giá thuê : {numberWithCommas(selectedItem.rentPrice)} VND
                  </p>
                  <br />
                  <p className="m-1">
                    Ngày tạo : {selectedItem.contractCreatedDay.split("T")[0]}
                  </p>
                  <br />
                  <p className="m-1">
                    Trạng thái Admin :{" "}
                    {selectedItem.statusAdminId ? "Đóng dấu" : "Chưa đóng dấu"}
                  </p>
                  <br />
                  <p className="m-1">
                    Trạng thái Người thuê :{" "}
                    {selectedItem.statusLessorId ? "Đóng dấu" : "Chưa đóng dấu"}
                  </p>
                  <br />
                  <p className="m-1">
                    Thời gian thuê : {selectedItem.tenancyPeriod} Tháng
                  </p>
                </>
              )}
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                onClick={() => {
                  setModal(false);
                  console.log("yes");
                }}
              >
                Đóng
              </Button>
              <Button
                color="primary"
                onClick={() => {
                  window.open(`/PDF?id=${selectedItem.conId}`, "_blank");
                }}
              >
                Tải hợp đồng
              </Button>
            </ModalFooter>
          </Modal>
        </CardBody>
      </Card>
    </Col>
  );
};

export default RecentTransaction;
