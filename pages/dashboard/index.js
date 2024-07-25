import { Container } from 'reactstrap'
import Breadcrumb from '../../components/Common/Breadcrumb'
// import Assigness from '../../components/dashboard/Assigness'
import Management from '../../components/dashboard/Management'
// import ProjectTimeline from '../../components/dashboard/ProjectTimeline'
// import Properies from '../../components/dashboard/Properies'
import Properylist from '../../components/dashboard/Properylist'
import ProperylistBan1 from '../../components/dashboard/ProperylistBan'
// import SalaryChart from '../../components/dashboard/SalaryChart'
// import Soldout from '../../components/dashboard/Soldout'
// import Status from '../../components/dashboard/Status'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'; 
import {getTokenFromCookie } from '../api/tokenUtils.js'
import axios from 'axios';
import {  deleteCookie,getCookie,hasCookie } from "cookies-next";
import Properies from '../../components/dashboard/Properies'


const Dashboard = () => {
  const router = useRouter();
  const [showDashboard, setShowDashboard] = useState(false);
  const [UserProfile2, setUserProfile2] = useState({});

  const token = getTokenFromCookie();
  const leId = getCookie('lessorId');

  console.log(leId);

  useEffect(() => {
    axios.get('https://ehouseapi20230817222213.azurewebsites.net/api/User/LoggedUser', {
      headers: {
        Authorization: token,
      }
    })
      .then((response) => {
        setUserProfile2(response.data);
        setShowDashboard(true)
      })
      .catch((error) => {
        console.error('Error:', error);
        // Xử lý lỗi nếu cần thiết
        if (error.response && error.response.status === 401) {
          // Nếu token hết hạn hoặc không hợp lệ, xóa token và đẩy người dùng về trang đăng nhập
          deleteCookie("token2");
          deleteCookie("currentUser");
          router.push('/authentication/login');
        }
      });
  }, []);

  const [propertydata, setPropertydata] = useState([]);

  useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `https://ehouseapi20230817222213.azurewebsites.net/api/HouseRent/GetHouseRentsByLessorIdAndHouseStatus/${leId}?houseStatus=false`,
            {
              headers: {
                Authorization: token,
              },
            }
          ); 
          setPropertydata(response.data);
          localStorage.setItem('dataHouse', JSON.stringify(response.data));
        } catch (error) {
          console.log(error);
        }
      };
      const storedData = localStorage.getItem('dataHouse');
      if (storedData) {
        setPropertydata(JSON.parse(storedData));
      } else {
        fetchData();
      }
  }, [leId]); 
  console.log(propertydata);

  const [ProperylistBan, setProperylistBan] = useState([]);

  useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `https://ehouseapi20230817222213.azurewebsites.net/api/HouseRent/GetHouseRentsByLessorIdAndHouseStatus/${leId}?houseStatus=true` ,
            {
              headers: {
                Authorization: token,
              },
            }
          ); 
          setProperylistBan(response.data);
          localStorage.setItem('dataHouseBan', JSON.stringify(response.data));
        } catch (error) {
          console.log(error);
        }
      };
      const storedData = localStorage.getItem('dataHouseBan');
      if (storedData) {
        setProperylistBan(JSON.parse(storedData));
      } else {
        fetchData();
      }
  }, [leId]); 

  console.log(ProperylistBan);

  useEffect(() => {
    if (UserProfile2.roleName === undefined) {
      return; // Nếu chưa có giá trị, đợi lần chạy useEffect tiếp theo khi UserProfile2.roleName đã được thiết lập
    }

    if (UserProfile2.roleName !== 'Lessor') {
      router.push('/authentication/404/wrongRole');
      deleteCookie("token2");
      deleteCookie("currentUser");
    } else {
      if (hasCookie("token2")) {
        setShowDashboard(true);
    } else {
        router.push('/authentication/login');
      }
    }
  }, [UserProfile2.roleName]);
  return (
    <>
      {showDashboard && (
        <>
          <Breadcrumb
            title='Bảng điều khiển'
            titleText='Xin chào bạn đến với trang cho thuê'
            parent='Bảng điều khiển'
          />
          <Container fluid={true}>
            <div className="row">
                <Properylist propertydata={propertydata} />
                <ProperylistBan1 ProperylistBan={ProperylistBan} />
                <Properies leId={leId} />
            </div>
            
          </Container>
        </>
      )}
    </>
  );
};

export default Dashboard;
