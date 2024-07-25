import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import Agentchart from "../../components/agents/profile/Agentchart";
import ProfileDetail from "../../components/agents/profile/ProfileDetail";
import ProjectMeeting from "../../components/agents/profile/ProjectMeeting";
import Breadcrumb from "../../components/Common/Breadcrumb";
import About from "../../components/manageuser/profile/About";
import Following from "../../components/manageuser/profile/Following";
import RecentChart from "../../components/manageuser/profile/RecentChart";
import RecentProperty from "../../components/manageuser/profile/RecentProperty";
// import { AgentAbout } from '../../data/agents/profiledata'
import axios from "axios";
import { useRouter } from "next/router";
import { deleteCookie, hasCookie } from "cookies-next";
import { getTokenFromCookie } from "../../pages/api/tokenUtils.js";

const Profile = () => {
  const router = useRouter();
  const [AgentAbout, setAgentAbout] = useState({});

  useEffect(() => {
    const token = getTokenFromCookie();

    axios
      .get("https://ehouseapi20230817222213.azurewebsites.net/api/User/LoggedUser", {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        const newAgentAbout = response.data;
        setAgentAbout(newAgentAbout);
        console.log("AgentAbout sau khi cập nhật:", newAgentAbout);
      })
      .catch((error) => {
        console.error("Error:", error);
        // Xử lý lỗi nếu cần thiết
      });
  }, []);

  const [showDashboard, setShowDashboard] = useState(false);

  useEffect(() => {
    if (AgentAbout.roleName === undefined) {
      return; // Nếu chưa có giá trị, đợi lần chạy useEffect tiếp theo khi AgentAbout.roleName đã được thiết lập
    }

    if (AgentAbout.roleName !== "Lessor") {
      deleteCookie("token2");
      deleteCookie("currentUser");
      deleteCookie("hoId");
      deleteCookie("lessorId");
      localStorage.removeItem("value");
      localStorage.removeItem("dataHouse");
      localStorage.removeItem("dataHouseList");
      localStorage.removeItem("dataHouseBan");
      router.push("/authentication/404/wrongRole");
    } else {
      if (hasCookie("token2")) {
        setShowDashboard(true);
      } else {
        router.push("/authentication/login");
      }
    }
  }, [AgentAbout.roleName]);

  return (
    <>
      {showDashboard && (
        <>
          <Breadcrumb
            title="Thông tin"
            titleText="Chào mừng đến với Bảng quản trị"
            parent="Thông tin"
          />
          <Container fluid={true}>
            <Row>
              <Col lg="12">
                <Row className="user-info">
                  <ProfileDetail />

                  <Col xl="4 xl-6" md="6">
                    <About Aboutdata={AgentAbout} />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </>
      )}
    </>
  );
};

export default Profile;
